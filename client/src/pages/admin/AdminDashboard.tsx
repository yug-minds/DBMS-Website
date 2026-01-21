import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Sidebar,
  SidebarBody,
  SidebarBrand,
  SidebarNavItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GalleryManager from "@/components/admin/GalleryManager";
import NewsManager from "@/components/admin/NewsManager";
import AchievementsManager from "@/components/admin/AchievementsManager";
import AdmissionInquiriesManager from "@/components/admin/AdmissionInquiriesManager";
import CareerApplicationsManager from "@/components/admin/CareerApplicationsManager";
import {
  ArrowLeft,
  LogOut,
  Images,
  Newspaper,
  Trophy,
  FileEdit,
  Briefcase,
} from "lucide-react";

type AdminTab = "gallery" | "news" | "achievements" | "admission-inquiries" | "career-applications";

function AdminDashboardContent({
  activeTab,
  setActiveTab,
  setBackToSiteOpen,
  handleLogout,
  admissionUnreadCount,
  careerUnreadCount,
  refetchCounts,
}: {
  activeTab: AdminTab;
  setActiveTab: (t: AdminTab) => void;
  setBackToSiteOpen: (v: boolean) => void;
  handleLogout: () => void;
  admissionUnreadCount: number;
  careerUnreadCount: number;
  refetchCounts: () => void;
}) {
  const { setOpen } = useSidebar();
  const nav = (t: AdminTab) => () => {
    setActiveTab(t);
    setOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">
      <SidebarBody className="flex flex-col md:h-full">
        <SidebarBrand
          icon={<img src="/DBMS Logo.jpeg" alt="DBMS" className="h-6 w-6 object-contain rounded-sm shrink-0" />}
          label="Dawn Buds Admin"
        />
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto min-h-0">
          <SidebarNavItem
            label="Manage Gallery"
            icon={<Images className="h-5 w-5 shrink-0" />}
            onClick={nav("gallery")}
            active={activeTab === "gallery"}
          />
          <SidebarNavItem
            label="Manage Latest News"
            icon={<Newspaper className="h-5 w-5 shrink-0" />}
            onClick={nav("news")}
            active={activeTab === "news"}
          />
          <SidebarNavItem
            label="Manage Achievements"
            icon={<Trophy className="h-5 w-5 shrink-0" />}
            onClick={nav("achievements")}
            active={activeTab === "achievements"}
          />
          <SidebarNavItem
            label="Admission Inquiries"
            icon={<FileEdit className="h-5 w-5 shrink-0" />}
            onClick={nav("admission-inquiries")}
            active={activeTab === "admission-inquiries"}
            count={admissionUnreadCount}
          />
          <SidebarNavItem
            label="Career Applications"
            icon={<Briefcase className="h-5 w-5 shrink-0" />}
            onClick={nav("career-applications")}
            active={activeTab === "career-applications"}
            count={careerUnreadCount}
          />
        </nav>
        <div className="pt-4 mt-auto border-t border-neutral-200 dark:border-neutral-700 flex flex-col gap-1 flex-shrink-0">
          <SidebarNavItem
            label="Back to site"
            icon={<ArrowLeft className="h-5 w-5 shrink-0" />}
            onClick={() => {
              setOpen(false);
              setBackToSiteOpen(true);
            }}
          />
          <SidebarNavItem
            label="Logout"
            icon={<LogOut className="h-5 w-5 shrink-0" />}
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
          />
        </div>
      </SidebarBody>

      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
            {activeTab === "gallery" && <GalleryManager />}
            {activeTab === "news" && <NewsManager />}
            {activeTab === "achievements" && <AchievementsManager />}
            {activeTab === "admission-inquiries" && (
              <AdmissionInquiriesManager onRefresh={refetchCounts} />
            )}
            {activeTab === "career-applications" && (
              <CareerApplicationsManager onRefresh={refetchCounts} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("gallery");
  const [backToSiteOpen, setBackToSiteOpen] = useState(false);
  const [admissionUnreadCount, setAdmissionUnreadCount] = useState(0);
  const [careerUnreadCount, setCareerUnreadCount] = useState(0);

  const refetchCounts = useCallback(async () => {
    const [adm, career] = await Promise.all([
      supabase.from("admission_inquiries").select("id", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("career_applications").select("id", { count: "exact", head: true }).eq("is_read", false),
    ]);
    setAdmissionUnreadCount(adm.count ?? 0);
    setCareerUnreadCount(career.count ?? 0);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  // Fetch unread counts when user is available
  useEffect(() => {
    if (user) refetchCounts();
  }, [user, refetchCounts]);

  async function handleLogout() {
    await signOut();
    setLocation("/login");
  }

  async function handleBackToSite() {
    await signOut();
    setLocation("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return null; // redirecting
  }

  return (
    <Sidebar>
      <AdminDashboardContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setBackToSiteOpen={setBackToSiteOpen}
        handleLogout={handleLogout}
        admissionUnreadCount={admissionUnreadCount}
        careerUnreadCount={careerUnreadCount}
        refetchCounts={refetchCounts}
      />

      <AlertDialog open={backToSiteOpen} onOpenChange={setBackToSiteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out and go to site?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to log out and return to the home page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBackToSite}>
              Yes, log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
