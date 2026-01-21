import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { AdmissionInquiryRow } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Check, CheckCheck, Trash2 } from "lucide-react";

export default function AdmissionInquiriesManager({ onRefresh }: { onRefresh?: () => void }) {
  const { toast } = useToast();
  const [items, setItems] = useState<AdmissionInquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState<AdmissionInquiryRow | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admission_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function handleMark(r: AdmissionInquiryRow) {
    const next = !(r.is_read ?? false);
    const { error } = await supabase
      .from("admission_inquiries")
      .update({ is_read: next })
      .eq("id", r.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: next ? "Marked as read" : "Marked as unread" });
    fetchItems();
    onRefresh?.();
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setSubmitting(true);
    const { error } = await supabase.from("admission_inquiries").delete().eq("id", deleteItem.id);
    setSubmitting(false);
    setDeleteItem(null);
    if (error) {
      toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Inquiry deleted" });
      fetchItems();
      onRefresh?.();
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (items.length === 0) return <p className="text-muted-foreground">No admission inquiries yet.</p>;

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-medium text-secondary w-12">#</th>
              <th className="p-3 font-medium text-secondary">Name</th>
              <th className="p-3 font-medium text-secondary">Email</th>
              <th className="p-3 font-medium text-secondary">Phone</th>
              <th className="p-3 font-medium text-secondary">Class</th>
              <th className="p-3 font-medium text-secondary">Message</th>
              <th className="p-3 font-medium text-secondary">Date</th>
              <th className="p-3 font-medium text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((r, i) => (
              <tr key={r.id} className={r.is_read ? "bg-gray-50/50" : undefined}>
                <td className="p-3 text-muted-foreground tabular-nums">{i + 1}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3">{r.class_interest}</td>
                <td className="p-3 max-w-[200px] truncate" title={r.message ?? ""}>{r.message || "—"}</td>
                <td className="p-3 text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMark(r)}
                      title={r.is_read ? "Mark as unread" : "Mark as read"}
                    >
                      {r.is_read ? <CheckCheck className="h-4 w-4 text-muted-foreground" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteItem(r)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete inquiry?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the inquiry from {deleteItem?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={submitting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {submitting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
