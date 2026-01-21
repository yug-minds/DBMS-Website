import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { AchievementRow } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import {
  DndContext,
  type DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const BUCKET = "achievement-images";

function makeStoragePath(filename: string): string {
  return `${crypto.randomUUID()}_${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
}

function SortableAchievementCard({
  row,
  index,
  onEdit,
  onDelete,
}: {
  row: AchievementRow;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm"
    >
      <div className="flex items-center gap-2 p-2 border-b border-gray-100 bg-gray-50/80">
        <button
          type="button"
          className="touch-none p-1 rounded cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground hover:bg-gray-200/80"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="text-xs text-muted-foreground">#{index + 1}</span>
      </div>
      <div className="aspect-video bg-gray-100">
        <img
          src={row.image_url}
          alt={row.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-secondary truncate">{row.title}</h3>
        <p className="text-xs font-semibold text-accent uppercase mt-1">{row.achievement_type}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(row.created_at).toLocaleDateString()}
        </p>
        <div className="mt-2 flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AchievementsManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<AchievementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<AchievementRow | null>(null);
  const [deleteItem, setDeleteItem] = useState<AchievementRow | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Error loading achievements", description: error.message, variant: "destructive" });
      setItems([]);
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = items.findIndex((i) => i.id === active.id);
    const toIndex = items.findIndex((i) => i.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;
    const reordered = arrayMove(items, fromIndex, toIndex);
    setItems(reordered);
    try {
      const results = await Promise.all(
        reordered.map((it, i) =>
          supabase.from("achievements").update({ sort_order: i }).eq("id", it.id)
        )
      );
      const err = results.find((r) => r.error);
      if (err) throw err.error;
      toast({ title: "Order saved" });
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error saving order",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
      fetchItems();
    }
  }

  const [createTitle, setCreateTitle] = useState("");
  const [createDesc, setCreateDesc] = useState("");
  const [createAchievementType, setCreateAchievementType] = useState("");
  const [createFile, setCreateFile] = useState<File | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editAchievementType, setEditAchievementType] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  function openCreate() {
    setCreateTitle("");
    setCreateDesc("");
    setCreateAchievementType("");
    setCreateFile(null);
    setCreateOpen(true);
  }

  function openEdit(row: AchievementRow) {
    setEditItem(row);
    setEditTitle(row.title);
    setEditDesc(row.description ?? "");
    setEditAchievementType(row.achievement_type);
    setEditFile(null);
  }

  async function handleCreate() {
    if (!user || !createTitle.trim() || !createAchievementType.trim()) return;
    if (!createFile) {
      toast({ title: "Please select an image", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const path = makeStoragePath(createFile.name);
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, createFile, { upsert: false });
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;

      const { error: insErr } = await supabase.from("achievements").insert({
        title: createTitle.trim(),
        description: createDesc.trim() || null,
        image_url: publicUrl,
        achievement_type: createAchievementType.trim(),
        sort_order: items.length ? Math.max(...items.map((i) => i.sort_order ?? 0)) + 1 : 0,
        created_by: user.id,
      });
      if (insErr) throw insErr;
      toast({ title: "Achievement created" });
      setCreateOpen(false);
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error creating achievement",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit() {
    if (!editItem) return;
    setSubmitting(true);
    try {
      let imageUrl = editItem.image_url;
      if (editFile) {
        const path = makeStoragePath(editFile.name);
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, editFile, { upsert: false });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
      const { error } = await supabase
        .from("achievements")
        .update({
          title: editTitle.trim(),
          description: editDesc.trim() || null,
          image_url: imageUrl,
          achievement_type: editAchievementType.trim(),
        })
        .eq("id", editItem.id);
      if (error) throw error;
      toast({ title: "Achievement updated" });
      setEditItem(null);
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error updating achievement",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("achievements").delete().eq("id", deleteItem.id);
      if (error) throw error;
      toast({ title: "Achievement deleted" });
      setDeleteItem(null);
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error deleting achievement",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading achievements…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add achievement
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((row, index) => (
              <SortableAchievementCard
                key={row.id}
                row={row}
                index={index}
                onEdit={() => openEdit(row)}
                onDelete={() => setDeleteItem(row)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No achievements yet. Add one to get started.</p>
      )}

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add achievement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="c-title">Title</Label>
              <Input
                id="c-title"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                placeholder="e.g. Gameathon Winners"
              />
            </div>
            <div>
              <Label htmlFor="c-desc">Description</Label>
              <Textarea
                id="c-desc"
                value={createDesc}
                onChange={(e) => setCreateDesc(e.target.value)}
                placeholder="Optional description"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="c-type">Achievement type</Label>
              <Input
                id="c-type"
                value={createAchievementType}
                onChange={(e) => setCreateAchievementType(e.target.value)}
                placeholder="e.g. Competition, Science, Sports, National"
              />
            </div>
            <div>
              <Label>Image</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCreateFile(e.target.files?.[0] ?? null)}
                />
                {createFile && <span className="text-sm text-muted-foreground truncate">{createFile.name}</span>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={submitting}>
              {submitting ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit achievement</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="e-title">Title</Label>
                <Input
                  id="e-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="e-desc">Description</Label>
                <Textarea
                  id="e-desc"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="e-type">Achievement type</Label>
                <Input
                  id="e-type"
                  value={editAchievementType}
                  onChange={(e) => setEditAchievementType(e.target.value)}
                />
              </div>
              <div>
                <Label>Current image</Label>
                <div className="mt-1 aspect-video max-h-32 w-full overflow-hidden rounded border bg-gray-100">
                  <img src={editItem.image_url} alt={editItem.title} className="h-full w-full object-contain" />
                </div>
              </div>
              <div>
                <Label>Replace image (optional)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                  className="mt-1"
                />
                {editFile && <span className="text-sm text-muted-foreground">{editFile.name}</span>}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>Cancel</Button>
            <Button onClick={handleEdit} disabled={submitting}>
              {submitting ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete achievement?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove &quot;{deleteItem?.title}&quot;. This action cannot be undone.
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
    </div>
  );
}
