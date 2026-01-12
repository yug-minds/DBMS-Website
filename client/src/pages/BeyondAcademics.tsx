import { PageHeader } from "@/components/PageHeader";
import { Music, Award, Palette, Microscope } from "lucide-react";

export default function BeyondAcademics() {
  return (
    <div className="min-h-screen bg-white">
      {/* students playing sports */}
      <PageHeader 
        title="Beyond Academics" 
        subtitle="Fostering creativity, talent, and physical well-being alongside academic growth."
        image="https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=2071&auto=format&fit=crop"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                <Music className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold text-secondary">Cultural Events</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe in celebrating our rich heritage and nurturing artistic talents. Our Annual Day is a grand spectacle involving every student. We also celebrate festivals like Sankranti, Independence Day, and Children's Day with fervor.
              </p>
            </div>
            {/* annual day stage */}
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" 
              alt="Cultural Events" 
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-last md:order-first">
               {/* art class */}
               <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" 
                alt="Co-curriculars" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold text-secondary">Co-Curricular Activities</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Education goes beyond the classroom. We offer dedicated sessions for Yoga, Arts & Crafts, Dance, and Music to ensure students have a well-rounded personality.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Microscope className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-display font-bold text-secondary">Science & Innovation</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Curiosity is the mother of invention. Our annual Science Fair allows students to demonstrate their scientific temper through working models and experiments.
              </p>
            </div>
            {/* science fair project */}
            <img 
              src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop" 
              alt="Science Fair" 
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
          </div>

        </div>
      </section>
    </div>
  );
}
