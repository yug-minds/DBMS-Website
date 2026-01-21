import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import BeyondAcademics from "@/pages/BeyondAcademics";
import Facilities from "@/pages/Facilities";
import Admissions from "@/pages/Admissions";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Sitemap from "@/pages/Sitemap";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Get base path from import.meta.env or default to /
const BASE_PATH = import.meta.env.BASE_URL || '/';

function Router() {
  // Handle GitHub Pages 404.html redirect
  useEffect(() => {
    const search = window.location.search;
    
    // Check if we're coming from the 404.html redirect
    if (search.includes('?/')) {
      const redirectPath = search.split('?/')[1]?.split('&')[0]?.replace(/~and~/g, '&') || '';
      if (redirectPath) {
        const newPath = BASE_PATH + redirectPath.replace(/^\//, '');
        window.history.replaceState(null, '', newPath);
        window.location.reload();
      }
    }
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/academics" component={Academics} />
      <Route path="/beyond-academics" component={BeyondAcademics} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Component to handle scroll restoration on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin") || location === "/login";

  return (
    <TooltipProvider>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          {!isAdmin && <Navigation />}
          <main className={`flex-grow ${isAdmin ? "pt-0" : "pt-20"}`}>
            <Router />
          </main>
          {!isAdmin && <Footer />}
        </div>
        <Toaster />
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
