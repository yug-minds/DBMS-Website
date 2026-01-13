import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Trophy, Users, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] bg-secondary overflow-hidden pb-8 md:pb-12">
        <div className="relative h-full">
          {/* Hero Content */}
          <div className="relative h-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            {/* children in classroom */}
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
              alt="Classroom learning" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-sm"
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
                  24 years of excellence in education. Nurturing students with values, knowledge, and skills for tomorrow's world.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link href="/admissions">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                      Admission Open 2024
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
          <h3 className="font-display font-bold text-lg md:text-xl">24 Years of Excellence</h3>
          <p className="text-white/80 text-xs md:text-sm">Serving education since 2000</p>
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

      {/* Director's Message */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/5 rounded-2xl transform rotate-3" />
              {/* principal portrait */}
              <img 
                src="/Principal Photo.jpg" 
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
                <span className="text-accent font-bold tracking-wider text-xs md:text-sm uppercase">Director's Message</span>
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
                <img src="/signature-placeholder.png" alt="" className="h-12 opacity-50" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pre-Primary",
                desc: "Playway method focusing on motor skills and social interaction.",
                color: "bg-amber-50 border-amber-100",
                icon: "🎨",
                link: "/academics"
              },
              {
                title: "Primary",
                desc: "Foundation building with activity-based learning.",
                color: "bg-blue-50 border-blue-100",
                icon: "📚",
                link: "/academics"
              },
              {
                title: "High School",
                desc: "Rigorous academic preparation for board exams and competitive future.",
                color: "bg-purple-50 border-purple-100",
                icon: "🔬",
                link: "/academics"
              }
            ].map((wing, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-2xl border ${wing.color} transition-all hover:shadow-lg`}
              >
                <div className="text-4xl mb-6">{wing.icon}</div>
                <h3 className="text-2xl font-display font-bold text-secondary mb-3">{wing.title}</h3>
                <p className="text-gray-600 mb-6">{wing.desc}</p>
                <Link href={wing.link}>
                  <span className="text-primary font-bold text-sm hover:underline cursor-pointer">Learn More →</span>
                </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Achievement Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  Gameathon Winners
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src="/Acheivements/Gameathon WINNERS.jpg" 
                    alt="Gameathon Winners" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Our students showcased exceptional talent and creativity in the Gameathon competition, emerging as winners through their innovative game development skills and problem-solving abilities. This achievement highlights our commitment to fostering technological excellence and creative thinking.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">Competition</span>
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>

            {/* Achievement Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  State Level Science Fair Participation
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src="/Acheivements/4_State level Science Fair Participation.jpeg" 
                    alt="State Level Science Fair Participation" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Our students represented the school with pride at the State Level Science Fair, demonstrating outstanding scientific knowledge and research capabilities. Their innovative projects and presentations showcased the quality of science education at Dawn Buds Model School.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">Science</span>
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>

            {/* Achievement Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  Kids Athletic Cup
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src="/Acheivements/4_Kids Athletic Cup.jpeg" 
                    alt="Kids Athletic Cup" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Our young athletes excelled in the Kids Athletic Cup, bringing home accolades and demonstrating exceptional sportsmanship, dedication, and physical prowess. This achievement reflects our holistic approach to education, emphasizing both academic and athletic excellence.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">Sports</span>
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>

            {/* Achievement Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-secondary mb-4">
                  BVP NGSC Participation
                </h3>
                
                {/* Main Image */}
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src="/Acheivements/BVP NGSC Participation..JPG" 
                    alt="BVP NGSC Participation" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Our students participated in the prestigious BVP NGSC (National Games and Sports Competition), showcasing their athletic talents and competitive spirit at the national level. This participation demonstrates our commitment to nurturing well-rounded individuals who excel beyond the classroom.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase">National</span>
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">Start Your Journey With Us</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto">
            Admissions are open for the academic year 2024-25. Give your child the advantage of a holistic education.
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
