import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BookOpen, GraduationCap } from "lucide-react";

export default function Academics() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* student writing */}
      <PageHeader 
        title="Academics" 
        subtitle="A curriculum designed to challenge, inspire, and prepare students for the future."
        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-secondary mb-6">Our Methodology</h2>
            <p className="text-gray-600 leading-relaxed">
              We follow the Telangana State Board curriculum, enriched with modern pedagogical practices. Our focus is on shifting from rote learning to competency-based education.
            </p>
          </div>

          <Tabs defaultValue="high-school" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white p-1 rounded-full shadow-sm border border-gray-200">
                <TabsTrigger value="pre-primary" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Pre-Primary</TabsTrigger>
                <TabsTrigger value="primary" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Primary</TabsTrigger>
                <TabsTrigger value="high-school" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">High School</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pre-primary" className="animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-secondary">Playway & Montessori</h3>
                  <p className="text-gray-600 text-lg">
                    Our Kindergarten wing (Nursery, LKG, UKG) focuses on the holistic development of the child. We use play as the primary medium of instruction.
                  </p>
                  <ul className="space-y-3">
                    {["Fine & Gross Motor Skills", "Social Interaction", "Phonetics & Language", "Art & Craft"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-pink-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* kindergarten kids */}
                <img 
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Kindergarten" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </TabsContent>

            <TabsContent value="primary" className="animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 order-last md:order-first">
                  {/* primary kids reading */}
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop" 
                    alt="Primary School" 
                    className="rounded-2xl shadow-xl w-full"
                  />
                </div>
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-secondary">Foundation Years (Class 1-5)</h3>
                  <p className="text-gray-600 text-lg">
                    The focus shifts to building strong foundations in Literacy and Numeracy. We encourage curiosity and questioning.
                  </p>
                  <ul className="space-y-3">
                    {["Activity Based Learning", "Environmental Awareness", "Basic ICT Skills", "Introduction to Languages"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="high-school" className="animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-secondary">High School (Class 6-10)</h3>
                  <p className="text-gray-600 text-lg">
                    Rigorous academic preparation aligned with the SSC Board. We prepare students for board exams and future competitive challenges.
                  </p>
                  <ul className="space-y-3">
                    {["Subject Specialization", "Science Practical Labs", "Advanced Computer Education", "Career Guidance"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-purple-500 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* high school students */}
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop" 
                  alt="High School" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
