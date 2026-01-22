import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Trophy, Star, Quote, Newspaper, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { NewsRow, AchievementRow, GalleryRow } from "@/lib/supabase";

const HERO_BG_INTERVAL_MS = 5000;

const NEWS_AUTO_SCROLL_PX_PER_FRAME = 1.5; /* 25% slower than 2 */
const NEWS_RESUME_DELAY_MS = 2000;

export default function Home() {
  const [news, setNews] = useState<NewsRow[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [achievements, setAchievements] = useState<AchievementRow[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryRow[]>([]);
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const newsViewportRef = useRef<HTMLDivElement | null>(null);
  const userInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  useEffect(() => {
    async function fetchNews() {
      setNewsLoading(true);
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("sort_order", { ascending: true });
      setNews(data ?? []);
      setNewsLoading(false);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchAchievements() {
      setAchievementsLoading(true);
      const { data } = await supabase
        .from("achievements")
        .select("*")
        .order("sort_order", { ascending: true });
      setAchievements(data ?? []);
      setAchievementsLoading(false);
    }
    fetchAchievements();
  }, []);

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("sort_order", { ascending: true });
      setGalleryImages((data ?? []).filter((r) => r.image_url));
    }
    fetchGallery();
  }, []);

  // Hero background: loop through gallery images only
  const heroBgSources = galleryImages.map((g) => g.image_url);

  useEffect(() => {
    if (heroBgSources.length <= 1) return;
    const t = setInterval(() => {
      setHeroBgIndex((i) => (i + 1) % heroBgSources.length);
    }, HERO_BG_INTERVAL_MS);
    return () => clearInterval(t);
  }, [heroBgSources.length]);

  // Auto-scroll only when more than 3 cards; 3 or fewer stay static
  useEffect(() => {
    if (!news.length) return;
    if (news.length <= 3) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = newsViewportRef.current;
    if (!el) return;

    function step() {
      if (!el || userInteractingRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      if (el.scrollWidth <= 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const oneSet = el.scrollWidth / 3;
      if (el.scrollLeft >= oneSet) el.scrollLeft = el.scrollLeft % oneSet;
      el.scrollLeft += NEWS_AUTO_SCROLL_PX_PER_FRAME;
      if (el.scrollLeft >= oneSet) el.scrollLeft -= oneSet;
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [news.length]);

  // Wheel-to-horizontal scroll with passive: false so preventDefault works
  useEffect(() => {
    const el = newsViewportRef.current;
    if (!el || !news.length) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (e.deltaX !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
        return;
      }
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [news.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] bg-secondary overflow-hidden pb-8 md:pb-12">
        <div className="relative h-full">
          {/* Hero Content */}
          <div className="relative h-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            {/* Looping hero background from gallery */}
            <div className="absolute inset-0 w-full h-full">
              {heroBgSources.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === heroBgIndex ? 1 : 0, zIndex: i === heroBgIndex ? 1 : 0 }}
                />
              ))}
            </div>
            <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block py-1 px-3 rounded-full text-white text-lg font-bold tracking-wider mb-6"
                >
                  WELCOME TO DAWN BUDS
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-tight px-2"
                >
                  Inspiring Minds, <br/>Shaping Futures
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2"
                >
                  25 years of excellence in education. Nurturing students with values, knowledge, and skills for tomorrow's world.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link href="/admissions">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto" key="admission-btn-2026">
                      Admission Open for 2026 - 27
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                      Schedule a Visit
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP Bar */}
      <div className="bg-primary py-8 md:py-12 relative z-30 mt-8 md:mt-12 mx-4 md:mx-8 lg:mx-12 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center text-white">
        <div className="space-y-2 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
          <Trophy className="w-8 h-8 md:w-10 md:h-10 mx-auto text-accent mb-3 md:mb-4" />
          <h3 className="font-display font-bold text-lg md:text-xl">25 Years of Excellence</h3>
          <p className="text-white/80 text-xs md:text-sm">Serving education since 2001</p>
        </div>
        <div className="space-y-2 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0">
          <Star className="w-8 h-8 md:w-10 md:h-10 mx-auto text-accent mb-3 md:mb-4" />
          <h3 className="font-display font-bold text-lg md:text-xl">100% SSC Results</h3>
          <p className="text-white/80 text-xs md:text-sm">Consistent academic success</p>
        </div>
        <div className="space-y-2">
          <BookOpen className="w-8 h-8 md:w-10 md:h-10 mx-auto text-accent mb-3 md:mb-4" />
          <h3 className="font-display font-bold text-lg md:text-xl">ICT-Enabled Learning</h3>
          <p className="text-white/80 text-xs md:text-sm">Modern tech for modern minds</p>
        </div>
      </div>

      {/* Latest News — infinite scroll, 2 cards visible, mobile-optimized */}
      <section className="mt-8 md:mt-12 lg:mt-16 py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80 sm:opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-10"
          >
            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-primary/10">
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary">Latest News</h2>
          </motion.div>

          {newsLoading && (
            <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-hidden">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[min(300px,84vw)] sm:w-[min(320px,calc(50vw-1.5rem))] md:w-[min(360px,calc(50vw-2rem))] rounded-xl md:rounded-2xl border-2 border-primary bg-white overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="h-36 md:h-40 bg-gray-100" />
                  <div className="p-4 md:p-6">
                    <div className="h-4 sm:h-5 bg-gray-100 rounded w-3/4 mb-2 sm:mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
                    <div className="h-3 bg-gray-100 rounded w-5/6 mb-1.5" />
                    <div className="h-3 bg-gray-100 rounded w-1/2 mt-3 md:mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!newsLoading && news.length === 0 && (
            <p className="text-center text-gray-500 py-10 sm:py-12 text-sm sm:text-base">No news yet. Check back soon.</p>
          )}

          {!newsLoading && news.length > 0 && (
            <div
              ref={newsViewportRef}
              className="news-scroll-viewport"
              onTouchStart={() => {
                userInteractingRef.current = true;
                if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
              }}
              onTouchEnd={() => {
                resumeTimeoutRef.current = setTimeout(() => {
                  userInteractingRef.current = false;
                  resumeTimeoutRef.current = null;
                }, NEWS_RESUME_DELAY_MS);
              }}
              onMouseDown={(e) => {
                userInteractingRef.current = true;
                if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
                const el = newsViewportRef.current;
                if (el) {
                  isDraggingRef.current = true;
                  dragStartXRef.current = e.clientX;
                  dragStartScrollLeftRef.current = el.scrollLeft;
                  el.style.userSelect = "none";
                  const onMouseMove = (e: MouseEvent) => {
                    if (!isDraggingRef.current) return;
                    e.preventDefault();
                    el.scrollLeft = dragStartScrollLeftRef.current + (dragStartXRef.current - e.clientX);
                  };
                  const onMouseUp = () => {
                    isDraggingRef.current = false;
                    el.style.userSelect = "";
                    window.removeEventListener("mousemove", onMouseMove);
                    resumeTimeoutRef.current = setTimeout(() => {
                      userInteractingRef.current = false;
                      resumeTimeoutRef.current = null;
                    }, NEWS_RESUME_DELAY_MS);
                  };
                  window.addEventListener("mousemove", onMouseMove);
                  window.addEventListener("mouseup", onMouseUp, { once: true });
                }
              }}
              onMouseUp={() => {
                resumeTimeoutRef.current = setTimeout(() => {
                  userInteractingRef.current = false;
                  resumeTimeoutRef.current = null;
                }, NEWS_RESUME_DELAY_MS);
              }}
              onMouseLeave={() => {
                if (!isDraggingRef.current) {
                  resumeTimeoutRef.current = setTimeout(() => {
                    userInteractingRef.current = false;
                    resumeTimeoutRef.current = null;
                  }, NEWS_RESUME_DELAY_MS);
                }
              }}
            >
              <div className="news-scroll-track flex gap-4 sm:gap-5 md:gap-6">
                {(news.length > 3 ? [...news, ...news, ...news] : news).map((item, i) => (
                  <article
                    key={news.length > 3 ? `${item.id}-${i}` : item.id}
                    className="news-card flex-shrink-0 w-[min(300px,84vw)] sm:w-[min(320px,calc(50vw-1.5rem))] md:w-[min(360px,calc(50vw-2rem))] rounded-xl md:rounded-2xl border-2 border-primary bg-white overflow-hidden shadow-sm hover:shadow-lg active:scale-[0.99] transition-all duration-200 touch-manipulation"
                  >
                    {item.image_url ? (
                      <div className="h-36 md:h-40 overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-28 md:h-32 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/80 flex-shrink-0">
                        <Newspaper className="w-10 h-10 md:w-12 md:h-12 text-gray-300" />
                      </div>
                    )}
                    <div className="p-4 md:p-5 lg:p-6 flex flex-col min-h-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-display font-bold text-primary mb-1.5 md:mb-2 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
                        {item.content}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 md:mt-4 text-[11px] sm:text-xs text-gray-400 flex-shrink-0">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <span>{new Date(item.published_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/5 rounded-2xl transform rotate-3" />
              {/* principal portrait */}
              <img 
                src="/Principal Photo.jpeg" 
                alt="Principal" 
                className="relative rounded-xl shadow-lg w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                <Quote className="w-8 h-8 text-primary mb-3" />
                <p className="text-gray-600 italic text-sm">
                  "Education is not the filling of a pail, but the lighting of a fire."
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <span className="text-accent font-bold tracking-wider text-xs md:text-sm uppercase">Principal's Message</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary mt-2 mb-4 md:mb-6">
                  Nurturing the Leaders of Tomorrow
                </h2>
                <div className="w-16 md:w-20 h-1 bg-primary rounded-full" />
              </div>
              
              <div className="prose prose-sm md:prose-lg text-gray-600 max-w-none">
                <p className="text-sm md:text-base lg:text-lg">
                  At Dawn Buds Model School, we believe every child is unique and capable of extraordinary things. Our mission goes beyond textbooks; we strive to build character, instill values, and foster a love for lifelong learning.
                </p>
                <p className="text-sm md:text-base lg:text-lg mt-3 md:mt-4">
                  For over two decades, we have been a beacon of educational excellence in Hyderabad, adapting to modern methodologies while staying rooted in our core values of discipline and integrity.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div>
                  <h4 className="font-display font-bold text-lg text-secondary">Mr. E.D. Nagaraju</h4>
                  <p className="text-gray-500">Principal</p>
                </div>
              </div>

              <Link href="/about">
                <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-white">
                  Read Our Story <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wings Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary mb-3 md:mb-4">Academic Wings</h2>
            <p className="text-gray-600 text-base md:text-lg">Tailored learning environments for every stage of development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Pre-Primary",
                desc: "Playway method focusing on motor skills and social interaction. Nurturing young minds through creative play and exploration.",
                image: "/acadamic wings images/Pre Primary.jpeg",
                gradient: "from-amber-500 to-orange-500",
                bgColor: "bg-amber-50",
                borderColor: "border-amber-200",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                link: "/academics?tab=pre-primary"
              },
              {
                title: "Primary",
                desc: "Foundation building with activity-based learning. Developing critical thinking and problem-solving skills from an early age.",
                image: "/acadamic wings images/Primary Activity.jpeg",
                gradient: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
                link: "/academics?tab=primary"
              },
              {
                title: "High School",
                desc: "Rigorous academic preparation for board exams and competitive future. Empowering students for success beyond the classroom.",
                image: "/Our Collaborations/robotics1.jpg",
                gradient: "from-purple-500 to-indigo-500",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
                link: "/academics?tab=high-school"
              }
            ].map((wing, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border-2 bg-white shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={wing.image} 
                    alt={wing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${wing.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className={`absolute top-4 right-4 ${wing.iconBg} ${wing.iconColor} p-3 rounded-xl shadow-lg`}>
                    {i === 0 && "🎨"}
                    {i === 1 && "📚"}
                    {i === 2 && "🔬"}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-display font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {wing.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                    {wing.desc}
                  </p>
                  <Link href={wing.link}>
                    <span className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all cursor-pointer group-hover:text-accent">
                      Learn More 
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${wing.bgColor} group-hover:h-2 transition-all duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-secondary mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              Our Achievements
            </h2>
            <p className="text-gray-600 text-base md:text-lg">Celebrating excellence and success of our students.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievementsLoading && (
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
                  >
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
                      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-5/6 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
                      <div className="flex justify-between pt-4 border-t border-gray-100">
                        <div className="h-3 bg-gray-200 rounded w-24" />
                        <div className="h-5 w-5 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!achievementsLoading && achievements.length === 0 && (
              <div className="col-span-full">
                <p className="text-center text-gray-500 py-10 sm:py-12 text-sm sm:text-base">
                  No achievements to display.
                </p>
              </div>
            )}

            {!achievementsLoading &&
              achievements.length > 0 &&
              achievements.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-secondary mb-4">
                      {item.title}
                    </h3>

                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Trophy className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {item.description ?? ""}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-accent uppercase">
                        {item.achievement_type}
                      </span>
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
        }}></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">Start Your Journey With Us</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto">
            Admissions are open for the academic year 2026-27. Give your child the advantage of a holistic education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
                Apply Online
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
                Contact Admissions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
