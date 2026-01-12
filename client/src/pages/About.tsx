import { PageHeader } from "@/components/PageHeader";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* library or reading room */}
      <PageHeader 
        title="About Us" 
        subtitle="Dedicated to fostering academic excellence and character development since 2000."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-secondary mb-4">Our Story</h2>
                <div className="w-16 h-1 bg-accent rounded-full mb-6" />
                <p className="text-gray-600 leading-relaxed text-lg">
                  Dawn Buds Model School was established in 2000 with a humble beginning and a grand vision: to provide affordable, high-quality education to the community. Over the last two decades, we have grown into a premier institution known for our academic rigor and holistic approach.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg mt-4">
                  Located in the heart of Hyderabad at Shyamlal Buildings, our campus has been a second home to thousands of students who have gone on to excel in various fields globally.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
                  <h3 className="font-display font-bold text-xl text-secondary mb-3">Our Vision</h3>
                  <p className="text-gray-600 text-sm">
                    To empower students to acquire, demonstrate, articulate and value knowledge and skills that will support them, as life-long learners.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-accent">
                  <h3 className="font-display font-bold text-xl text-secondary mb-3">Our Mission</h3>
                  <p className="text-gray-600 text-sm">
                    To provide a safe, respectful, and inclusive environment for building a foundation for life-long learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* student studying */}
                <img 
                  src="https://pixabay.com/get/ge315c5020f42f0111a433c12dd05d1562a5bc45d16707e7b7e2e77a44dc98fa3837160d9151ecfada85b8d36124a2a9e9bfaa0a8cae4485f5788beeeacf56a05_1280.jpg" 
                  alt="Students" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
                />
                {/* science lab */}
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Lab" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-secondary">Our Leadership</h2>
            <p className="text-gray-600 mt-4">The visionaries guiding our institution</p>
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

      {/* Mandatory Disclosures */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-display font-bold text-secondary mb-6 flex items-center gap-3">
              <CheckCircle className="text-primary" /> Mandatory Disclosures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Affiliation Status</span>
                <span className="font-semibold text-secondary">State Board (Permanent)</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>School Code</span>
                <span className="font-semibold text-secondary">12345</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Society Reg. No.</span>
                <span className="font-semibold text-secondary">ABC/2000/123</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>NOC Issued By</span>
                <span className="font-semibold text-secondary">Govt of Telangana</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
