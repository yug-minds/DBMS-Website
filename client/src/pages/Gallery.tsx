import { PageHeader } from "@/components/PageHeader";

export default function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop", cat: "Events" },
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop", cat: "Academics" },
    { src: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2070&auto=format&fit=crop", cat: "Sports" },
    { src: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop", cat: "Campus" },
    { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop", cat: "Students" },
    { src: "https://images.unsplash.com/photo-1544531696-2852a3d65e27?q=80&w=1000&auto=format&fit=crop", cat: "Events" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* art gallery or exhibition */}
      <PageHeader 
        title="Gallery" 
        subtitle="Glimpses of life at Dawn Buds Model School."
        image="https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
                <img 
                  src={img.src} 
                  alt={img.cat} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl tracking-wider uppercase border-b-2 border-accent pb-1">
                    {img.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
