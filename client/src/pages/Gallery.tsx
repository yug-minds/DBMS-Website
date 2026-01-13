import { PageHeader } from "@/components/PageHeader";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventGallery = {
  title: string;
  images: string[];
};

export default function Gallery() {
  const events: EventGallery[] = [
    {
      title: "BATHUKAMMA CELEBRATIONS",
      images: [
        "/Dbms Event Pics/Bathukamma Celebrations.jpeg",
      ],
    },
    {
      title: "BVP NGSC PARTICIPATION",
      images: [
        "/Dbms Event Pics/BVP NGSC Participation.JPG",
        "/Dbms Event Pics/BVP NGSC Participation..JPG",
      ],
    },
    {
      title: "GRADUATION DAY CELEBRATIONS",
      images: [
        "/Dbms Event Pics/1_GRADUATION DAY CELEBRATIONS.jpg",
      ],
    },
    {
      title: "HERITAGE FEST",
      images: [
        "/Dbms Event Pics/1_Heritage Fest.jpeg",
      ],
    },
    {
      title: "KRISHNA ASTAMI",
      images: [
        "/Dbms Event Pics/2_Krishnastami Celebrations.jpg",
      ],
    },
    {
      title: "OUR WELL DEDICATED STAFF",
      images: [
        "/Dbms Event Pics/Our Well Dedicated Staff.jpeg",
      ],
    },
    {
      title: "PRE PRIMARY PICNIC",
      images: [
        "/Dbms Event Pics/3_Pre Primary Picnic.jpeg",
      ],
    },
    {
      title: "ROBOTICS EXPO",
      images: [
        "/Dbms Event Pics/3_Robotics Expo.jpeg",
      ],
    },
    {
      title: "SANKARTHI CELEBRATIONS",
      images: [
        "/Dbms Event Pics/1_Sankarthi Celebrations.jpeg",
      ],
    },
    {
      title: "SCHOOL EVENTS",
      images: [
        "/Dbms Event Pics/WhatsApp Image 2025-12-23 at 7.46.52 PM.jpeg",
        "/Dbms Event Pics/WhatsApp Image 2026-01-13 at 10.52.08.jpeg",
      ],
    },
    {
      title: "SCHOOL PICNIC",
      images: [
        "/Dbms Event Pics/School Picnic.jpeg",
      ],
    },
    {
      title: "SCIENCE FAIR",
      images: [
        "/Dbms Event Pics/3_Science Fair.jpeg",
        "/Dbms Event Pics/4_State level Science Fair Participation.jpeg",
      ],
    },
    {
      title: "SPORTS ACTIVITY",
      images: [
        "/Dbms Event Pics/Sports Activity.jpeg",
        "/Dbms Event Pics/4_Kids Athletic Cup.jpeg",
      ],
    },
    {
      title: "SSC STUDENTS MOTIVATIONAL CLASS",
      images: [
        "/Dbms Event Pics/4_SSC Students Motivaional Class.jpeg",
      ],
    },
    {
      title: "TEACHERS DAY",
      images: [
        "/Dbms Event Pics/Teachers Day Celebrations..JPG",
      ],
    },
    {
      title: "YELLOW COLOR DAY",
      images: [
        "/Dbms Event Pics/2_Yello Color Day.jpeg",
      ],
    },
    {
      title: "YOGA DAY",
      images: [
        "/Dbms Event Pics/3_Yoga Day.jpeg",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Gallery" 
        subtitle="Glimpses of life at Dawn Buds Model School."
        image="https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }: { event: EventGallery }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      {/* Title */}
      <div className="px-4 py-3 bg-primary/5 border-b border-gray-100">
        <h3 className="text-sm md:text-base font-display font-bold text-secondary uppercase tracking-wide text-center">
          {event.title}
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-0">
            {event.images.map((image, imgIndex) => (
              <CarouselItem key={imgIndex} className="pl-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={`${event.title} - Image ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation Controls - Bottom Center */}
        {event.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={current === 1}
              className="text-gray-700 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-gray-700 text-sm font-semibold min-w-[3.5rem] text-center">
              {current} of {count}
            </span>
            <button
              onClick={() => api?.scrollNext()}
              disabled={current === count}
              className="text-gray-700 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
