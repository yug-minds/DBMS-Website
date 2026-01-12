import { PageHeader } from "@/components/PageHeader";
import { Monitor, FlaskConical, Library, Bus, ShieldCheck, Dumbbell } from "lucide-react";

export default function Facilities() {
  const facilities = [
    {
      icon: <Monitor className="w-10 h-10 text-white" />,
      title: "Computer Lab",
      desc: "Modern computer lab with high-speed internet and latest software for hands-on technical learning.",
      color: "bg-blue-500",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: <FlaskConical className="w-10 h-10 text-white" />,
      title: "Science Labs",
      desc: "Fully equipped Physics, Chemistry, and Biology labs to encourage experimentation and scientific inquiry.",
      color: "bg-green-500",
      img: "https://images.unsplash.com/photo-1576487248871-36934024d91e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: <Library className="w-10 h-10 text-white" />,
      title: "Library",
      desc: "A vast collection of books, journals, and reference materials to cultivate reading habits.",
      color: "bg-amber-500",
      img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: <Bus className="w-10 h-10 text-white" />,
      title: "Transport",
      desc: "Safe and secure bus facility covering major routes in Hyderabad with GPS tracking.",
      color: "bg-yellow-500",
      img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
      title: "Safety & Security",
      desc: "24/7 CCTV surveillance, security guards, and fire safety compliance ensuring a safe campus.",
      color: "bg-red-500",
      img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: <Dumbbell className="w-10 h-10 text-white" />,
      title: "Sports Area",
      desc: "Dedicated areas for indoor and outdoor games to promote physical fitness.",
      color: "bg-indigo-500",
      img: "https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=2071&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* modern school hallway */}
      <PageHeader 
        title="Campus & Facilities" 
        subtitle="Creating an environment conducive to learning, safety, and growth."
        image="https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${item.color} mix-blend-multiply z-10`} />
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute bottom-4 right-4 p-3 rounded-xl ${item.color} shadow-lg z-20`}>
                    {item.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-display font-bold text-secondary mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
