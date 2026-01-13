import { PageHeader } from "@/components/PageHeader";
import { Target, Flag, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* library or reading room */}
      <PageHeader 
        title="About Us" 
        subtitle="Dedicated to fostering academic excellence and character development since 2000."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary mb-3 md:mb-4">Our Story</h2>
                <div className="w-12 md:w-16 h-1 bg-accent rounded-full mb-4 md:mb-6" />
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Dawn Buds Model School was established in 2000 with a humble beginning and a grand vision: to provide affordable, high-quality education to the community. Over the last two decades, we have grown into a premier institution known for our academic rigor and holistic approach.
                </p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg mt-3 md:mt-4">
                  Located in the heart of Hyderabad at Begumpet, beside Sai Hanuman Temple, our campus at Shamlal Buildings has been a second home to thousands of students who have gone on to excel in various fields globally.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src="/Building photo.JPG" 
                  alt="Dawn Buds Model School Building" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Cards */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow w-full md:w-[400px]"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-secondary">Our Vision</h3>
                </div>

                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  To empower students to acquire, demonstrate, articulate and value knowledge and skills that will support them, as life-long learners.
                </p>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">Vision</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow w-full md:w-[400px]"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Flag className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-secondary">Our Mission</h3>
                </div>

                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  To provide a safe, respectful, and inclusive environment for building a foundation for life-long learning.
                </p>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">Mission</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary">Our Leadership</h2>
            <p className="text-gray-600 mt-3 md:mt-4">The visionaries guiding our institution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* Cards for leadership */}
            {[
              {
                name: "Mr. Rajesh Kumar",
                role: "Correspondent",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
              },
              {
                name: "Mrs. Lakshmi Reddy",
                role: "Principal",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
              },
              {
                name: "Mr. P. Sharma",
                role: "Academic Director",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
              }
            ].map((leader, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center group">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-50 group-hover:border-primary transition-colors">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-display font-bold text-secondary">{leader.name}</h3>
                <p className="text-accent font-medium text-sm mt-1">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Branches */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary mb-3 md:mb-4">Our Branches</h2>
            <div className="w-12 md:w-16 h-1 bg-accent rounded-full mx-auto mb-4 md:mb-6" />
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              We are proud to expand our educational excellence through our branch locations, bringing quality education closer to communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Main Branch - Dawn Buds Model School */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-secondary mb-2">
                      Dawn Buds Model School
                    </h3>
                    <p className="text-accent font-medium text-sm">Main Campus</p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <p className="text-gray-600 leading-relaxed text-base">
                    Our main campus located in Begumpet, Hyderabad, has been serving the community since 2000. This flagship location offers comprehensive education from primary to secondary levels, with state-of-the-art facilities and a dedicated faculty committed to nurturing young minds.
                  </p>
                  
                  <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                    <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Address</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        1-11-110/17/B/9, Shamlal Buildings<br/>
                        beside Sai Hanuman Temple, Begumpet<br/>
                        Hyderabad, Telangana 500016
                      </p>
                      <a 
                        href="https://www.google.com/maps?ll=17.447177,78.459934&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=3573388977949407245" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-accent transition-colors flex items-center gap-2 text-sm"
                      >
                        View on Google Maps
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* St Louis The Techno Concept School Branch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-secondary mb-2">
                      St Louis The Techno Concept School
                    </h3>
                    <p className="text-accent font-medium text-sm">Techno Concept Branch</p>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <p className="text-gray-600 leading-relaxed text-base">
                    St Louis The Techno Concept School is our innovative branch that combines traditional educational values with modern technological approaches. This branch focuses on providing students with a technology-enhanced learning environment, preparing them for the digital future while maintaining the core principles of academic excellence.
                  </p>
                  
                  <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                    <div className="bg-primary/10 p-2 rounded-full text-primary shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Address</h4>
                      <p className="text-gray-600 text-sm mb-2">
                        1-6-213/A/1, Parsigutta, Gangaputra Nagar<br/>
                        Secunderabad, Hyderabad<br/>
                        Telangana 500020
                      </p>
                      <a 
                        href="https://maps.app.goo.gl/sh5wCH8gNk1r4HQF6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-accent transition-colors flex items-center gap-2 text-sm"
                      >
                        View on Google Maps
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
