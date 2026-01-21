import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { NewsRow } from "@/lib/supabase";
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
import { Plus, Pencil, Trash2, GripVertical, Newspaper } from "lucide-react";
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

const BUCKET = "news-images";

function makeStoragePath(filename: string): string {
  return `${crypto.randomUUID()}_${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
}

function toDatetimeLocal(iso: string): string {
  try {
    return new Date(iso).toISOString().slice(0, 16);
  } catch {
    return new Date().toISOString().slice(0, 16);
  }
}

function SortableNewsCard({
  row,
  index,
  onEdit,
  onDelete,
}: {
  row: NewsRow;
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
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
        {row.image_url ? (
          <img src={row.image_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <Newspaper className="h-10 w-10 text-gray-300" />
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-secondary truncate">{row.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{row.content}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(row.published_at).toLocaleString()}
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

export default function NewsManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewsRow | null>(null);
  const [deleteItem, setDeleteItem] = useState<NewsRow | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Error loading news", description: error.message, variant: "destructive" });
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
          supabase.from("news").update({ sort_order: i }).eq("id", it.id)
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
  const [createContent, setCreateContent] = useState("");
  const [createFile, setCreateFile] = useState<File | null>(null);
  const [createPublishedAt, setCreatePublishedAt] = useState(() => new Date().toISOString().slice(0, 16));

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPublishedAt, setEditPublishedAt] = useState("");

  function openCreate() {
    setCreateTitle("");
    setCreateContent("");
    setCreateFile(null);
    setCreatePublishedAt(new Date().toISOString().slice(0, 16));
    setCreateOpen(true);
  }

  function openEdit(row: NewsRow) {
    setEditItem(row);
    setEditTitle(row.title);
    setEditContent(row.content);
    setEditFile(null);
    setEditPublishedAt(toDatetimeLocal(row.published_at));
  }

  function parseDatetimeLocal(s: string): string {
    if (!s) return new Date().toISOString();
    return new Date(s).toISOString();
  }

  async function handleCreate() {
    if (!user || !createTitle.trim() || !createContent.trim()) return;
    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (createFile) {
        const path = makeStoragePath(createFile.name);
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, createFile, { upsert: false });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
      const { error } = await supabase.from("news").insert({
        title: createTitle.trim(),
        content: createContent.trim(),
        image_url: imageUrl,
        sort_order: items.length ? Math.max(...items.map((i) => i.sort_order ?? 0)) + 1 : 0,
        published_at: parseDatetimeLocal(createPublishedAt),
        created_by: user.id,
      });
      if (error) throw error;
      toast({ title: "News post created" });
      setCreateOpen(false);
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error creating post",
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
      let imageUrl: string | null = editItem.image_url;
      if (editFile) {
        const path = makeStoragePath(editFile.name);
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, editFile, { upsert: false });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
      const { error } = await supabase
        .from("news")
        .update({
          title: editTitle.trim(),
          content: editContent.trim(),
          image_url: imageUrl,
          published_at: parseDatetimeLocal(editPublishedAt),
        })
        .eq("id", editItem.id);
      if (error) throw error;
      toast({ title: "News post updated" });
      setEditItem(null);
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error updating post",
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
      const { error } = await supabase.from("news").delete().eq("id", deleteItem.id);
      if (error) throw error;
      toast({ title: "News post deleted" });
      setDeleteItem(null);
      fetchItems();
    } catch (e: unknown) {
      toast({
        title: "Error deleting post",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading news…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add post
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
              <SortableNewsCard
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
        <p className="text-center text-muted-foreground py-8">No news posts yet. Add one to get started.</p>
      )}

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add news post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="c-title">Title</Label>
              <Input
                id="c-title"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                placeholder="Headline"
              />
            </div>
            <div>
              <Label htmlFor="c-content">Content</Label>
              <Textarea
                id="c-content"
                value={createContent}
                onChange={(e) => setCreateContent(e.target.value)}
                placeholder="Article content"
                rows={4}
              />
            </div>
            <div>
              <Label>Image (optional)</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCreateFile(e.target.files?.[0] ?? null)}
                />
                {createFile && <span className="text-sm text-muted-foreground truncate">{createFile.name}</span>}
              </div>
            </div>
            <div>
              <Label htmlFor="c-date">Published at</Label>
              <Input
                id="c-date"
                type="datetime-local"
                value={createPublishedAt}
                onChange={(e) => setCreatePublishedAt(e.target.value)}
              />
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
            <DialogTitle>Edit news post</DialogTitle>
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
                <Label htmlFor="e-content">Content</Label>
                <Textarea
                  id="e-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                />
              </div>
              {editItem.image_url && (
                <div>
                  <Label>Current image</Label>
                  <div className="mt-1 aspect-video max-h-32 w-full overflow-hidden rounded border bg-gray-100">
                    <img src={editItem.image_url} alt="" className="h-full w-full object-contain" />
                  </div>
                </div>
              )}
              <div>
                <Label>Replace image (optional)</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                  />
                  {editFile && <span className="text-sm text-muted-foreground truncate">{editFile.name}</span>}
                </div>
              </div>
              <div>
                <Label htmlFor="e-date">Published at</Label>
                <Input
                  id="e-date"
                  type="datetime-local"
                  value={editPublishedAt}
                  onChange={(e) => setEditPublishedAt(e.target.value)}
                />
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
            <AlertDialogTitle>Delete news post?</AlertDialogTitle>
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
