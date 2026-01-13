import { PageHeader } from "@/components/PageHeader";
import { Music, Award, Palette, Microscope, Star, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

export default function BeyondAcademics() {
  return (
    <div className="min-h-screen bg-white">
      {/* students playing sports */}
      <PageHeader 
        title="Beyond Academics" 
        subtitle="Fostering creativity, talent, and physical well-being alongside academic growth."
        image="https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=2071&auto=format&fit=crop"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16 lg:mb-24">
            <div className="space-y-4 md:space-y-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-3 md:mb-4">
                <Music className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary">Cultural Events</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We believe in celebrating our rich heritage and nurturing artistic talents. Our Annual Day is a grand spectacle involving every student. We also celebrate festivals like Sankranti, Independence Day, and Children's Day with fervor.
              </p>
            </div>
            {/* Cultural Events Carousel */}
            <CulturalEventsCarousel />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-16 lg:mb-24">
            <div className="order-last md:order-first">
              {/* Co-Curricular Activities Carousel */}
              <CoCurricularCarousel />
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 md:mb-4">
                <Palette className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary">Co-Curricular Activities</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Education goes beyond the classroom. We offer dedicated sessions for Yoga, Arts & Crafts, Dance, and Music to ensure students have a well-rounded personality.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-3 md:mb-4">
                <Microscope className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary">Science & Innovation</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Curiosity is the mother of invention. Our annual Science Fair allows students to demonstrate their scientific temper through working models and experiments.
              </p>
            </div>
            {/* Science & Innovation Carousel */}
            <ScienceInnovationCarousel />
          </div>

        </div>
      </section>

      {/* Our Collaborations Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              Our Collaborations
            </h2>
            <p className="text-gray-600 text-base md:text-lg">Strategic partnerships that enhance our educational offerings and student development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collaboration Card 1 - Abacus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  Abacus Training
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-xs">Main Image</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Description of Abacus collaboration will be added here. This is placeholder text that you can replace with actual collaboration details.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">Academic</span>
                  <Handshake className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>

            {/* Collaboration Card 2 - IIT Classes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  IIT Classes
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-xs">Main Image</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Description of IIT classes collaboration will be added here. This is placeholder text that you can replace with actual collaboration details.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">Academic</span>
                  <Handshake className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>

            {/* Collaboration Card 3 - Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  Collaboration Title 3
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-xs">Main Image</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Description of collaboration will be added here. This is placeholder text that you can replace with actual collaboration details.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">Category</span>
                  <Handshake className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CulturalEventsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const culturalImages = [
    "/Dbms Event Pics/Bathukamma Celebrations.jpeg",
    "/Dbms Event Pics/2_Krishnastami Celebrations.jpg"
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play carousel - change image every 4 seconds
    const interval = setInterval(() => {
      const currentIndex = api.selectedScrollSnap();
      if (currentIndex === culturalImages.length - 1) {
        // If at last image, go back to first
        api.scrollTo(0);
      } else {
        // Otherwise, go to next
        api.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api, culturalImages.length]);

  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {culturalImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0 basis-full">
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={index === 0 ? "Bathukamma Celebrations" : "Krishna Astami Celebrations"}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function CoCurricularCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const coCurricularImages = [
    "/Dbms Event Pics/Sports Activity.jpeg",
    "/Dbms Event Pics/3_Yoga Day.jpeg"
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play carousel - change image every 4 seconds
    const interval = setInterval(() => {
      const currentIndex = api.selectedScrollSnap();
      if (currentIndex === coCurricularImages.length - 1) {
        // If at last image, go back to first
        api.scrollTo(0);
      } else {
        // Otherwise, go to next
        api.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api, coCurricularImages.length]);

  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {coCurricularImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0 basis-full">
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={index === 0 ? "Sports Activity" : "Yoga Day"}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function ScienceInnovationCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const scienceImages = [
    "/Dbms Event Pics/3_Robotics Expo.jpeg",
    "/Dbms Event Pics/3_Science Fair.jpeg"
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play carousel - change image every 4 seconds
    const interval = setInterval(() => {
      const currentIndex = api.selectedScrollSnap();
      if (currentIndex === scienceImages.length - 1) {
        // If at last image, go back to first
        api.scrollTo(0);
      } else {
        // Otherwise, go to next
        api.scrollNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api, scienceImages.length]);

  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {scienceImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0 basis-full">
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={index === 0 ? "Robotics Expo" : "Science Fair"}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
