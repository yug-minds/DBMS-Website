import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/lib/supabase";
import type { GalleryRow } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("gallery")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) {
        setError(err.message);
        setItems([]);
      } else {
        setItems(data ?? []);
      }
      setLoading(false);
    }
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Gallery"
        subtitle="Glimpses of life at Dawn Buds Model School."
        image="https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 overflow-hidden bg-gray-50 animate-pulse"
                >
                  <div className="aspect-[16/9] bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Unable to load gallery. {error}</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No gallery items yet. Check back soon.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 bg-primary/5 border-t border-gray-100">
                    <h3 className="text-sm md:text-base font-display font-bold text-secondary uppercase tracking-wide">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
