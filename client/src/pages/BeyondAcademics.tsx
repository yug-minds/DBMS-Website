import { PageHeader } from "@/components/PageHeader";
import { Music, Palette, Microscope, Star, Handshake } from "lucide-react";
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
      <OurCollaborationsSection />
    </div>
  );
}

const COLLABORATIONS = [
  // Row 1: Quest English, IIT, Abacus
  {
    title: "Quest English",
    image: "/Our Collaborations/quest english.jpeg",
    description: "Through Quest English we focus on building confidence in communication, vocabulary, and language skills. The programme helps students express themselves clearly and prepares them for a global learning and career environment.",
    category: "Academic",
  },
  {
    title: "IIT & NEET Foundation",
    image: "/Our Collaborations/IIT:NEET Foundation.jpeg",
    description: "Our IIT and NEET foundation programme prepares aspiring students with strong conceptual clarity and exam-oriented learning. Through dedicated mentorship and structured content, we help build a solid base for competitive entrance examinations.",
    category: "Academic",
  },
  {
    title: "Abacus Training",
    image: "/Our Collaborations/Abacus.jpeg",
    description: "We partner with experts to offer structured Abacus training that sharpens mental math, concentration, and problem-solving skills. Students build speed and accuracy in calculations while developing focus and logical thinking from an early age.",
    category: "Academic",
  },
  // Row 2: Robotics, Coding, AI/ML
  {
    title: "Robotics",
    image: "/Our Collaborations/robotics1.jpg",
    description: "Our Robotics programme gives students hands-on experience in designing, building, and programming robots. They learn mechanics, electronics, and coding while working in teams to solve real-world challenges.",
    category: "Technology",
  },
  {
    title: "Coding",
    image: "/Our Collaborations/Coding .jpg",
    description: "We collaborate to bring structured coding and programming education to our students. From block-based coding to text-based languages, students develop computational thinking, logic, and creativity through building real projects.",
    category: "Technology",
  },
  {
    title: "AI & Machine Learning",
    image: "/Our Collaborations/AI:ML.jpg",
    description: "Our AI and Machine Learning programme introduces students to the fundamentals of artificial intelligence, data, and automation. Through hands-on projects, they learn to think critically and prepare for the technology-driven future.",
    category: "Technology",
  },
  // Row 3: Digital Classroom
  {
    title: "Digital Classroom",
    image: "/Our Collaborations/Digital classroom.jpeg",
    description: "Our Digital Classroom partnership equips students with tech-enabled learning through smart boards, interactive content, and digital tools. This creates an engaging, modern learning environment that supports varied learning styles.",
    category: "Academic",
  },
];

function OurCollaborationsSection() {
  return (
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
          {COLLABORATIONS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  {item.title}
                </h3>

                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">{item.category}</span>
                  <Handshake className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CulturalEventsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const culturalImages = [
    { src: "/Dbms Event Pics/Bathukamma Celebrations.jpeg", alt: "Bathukamma Celebrations" },
    { src: "/Dbms Event Pics/2_Krishnastami Celebrations.jpg", alt: "Krishna Astami Celebrations" },
    { src: "/Dbms Event Pics/1_Heritage Fest.jpeg", alt: "Heritage Fest" },
    { src: "/Dbms Event Pics/1_Sankarthi Celebrations.jpeg", alt: "Sankranti Celebrations" },
    { src: "/Dbms Event Pics/Teachers Day Celebrations..JPG", alt: "Teachers Day Celebrations" },
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
                  src={image.src}
                  alt={image.alt}
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
    { src: "/Dbms Event Pics/Sports Activity.jpeg", alt: "Sports Activity" },
    { src: "/Dbms Event Pics/3_Yoga Day.jpeg", alt: "Yoga Day" },
    { src: "/Dbms Event Pics/2_Yello Color Day.jpeg", alt: "Yellow Colour Day" },
    { src: "/Dbms Event Pics/3_Pre Primary Picnic.jpeg", alt: "Pre Primary Picnic" },
    { src: "/Dbms Event Pics/4_Kids Athletic Cup.jpeg", alt: "Kids Athletic Cup" },
    { src: "/Dbms Event Pics/School Picnic.jpeg", alt: "School Picnic" },
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
                  src={image.src}
                  alt={image.alt}
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
    { src: "/Dbms Event Pics/3_Robotics Expo.jpeg", alt: "Robotics Expo" },
    { src: "/Dbms Event Pics/3_Science Fair.jpeg", alt: "Science Fair" },
    { src: "/Dbms Event Pics/4_State level Science Fair Participation.jpeg", alt: "State level Science Fair Participation" },
    { src: "/Dbms Event Pics/BVP NGSC Participation..JPG", alt: "BVP NGSC Participation" },
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
                  src={image.src}
                  alt={image.alt}
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
