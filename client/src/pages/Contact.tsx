import { PageHeader } from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

// Schema for Careers
const careerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10, "Valid phone required"),
  position: z.string().min(2, "Position required"),
  experience: z.string().optional(),
  resumeLink: z.string().refine((s) => (s || "").trim().length > 0, "Resume link is required"),
  message: z.string().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const careerForm = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: { name: "", email: "", phone: "", position: "", experience: "", resumeLink: "", message: "" },
  });

  async function onCareerSubmit(values: z.infer<typeof careerSchema>) {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env (see SUPABASE_SETUP.md).",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("career_applications").insert({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        position: values.position.trim(),
        experience: values.experience?.trim() || null,
        resume_link: values.resumeLink?.trim() || null,
        message: values.message?.trim() || null,
      });
      if (error) throw error;
      careerForm.reset();
      toast({
        title: "Application Received Successfully!",
        description: "Thank you for your interest in joining our team. We will contact you soon.",
        variant: "default",
      });
    } catch (err) {
      console.error("Error submitting application:", err);
      let description = "Failed to submit application. Please try again later or contact us directly.";
      if (err != null && typeof err === "object" && "message" in err && (err as { message: unknown }).message)
        description = String((err as { message: string }).message);
      else if (err instanceof Error && err.message) description = err.message;
      toast({ title: "Submission Failed", description, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* contact us banner - phone or desk */}
      <PageHeader 
        title="Contact Us" 
        subtitle="We'd love to hear from you. Visit us or reach out online."
        image="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-secondary mb-4 md:mb-6">Get in Touch</h2>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full text-primary shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">Address</h4>
                      <p className="text-gray-600 text-xs md:text-sm">
                        <strong className="font-bold text-gray-900">Dawn Buds Model School</strong><br />
                        <span className="block whitespace-nowrap">1-11-110/17/B/9, Shyamlal Building,</span>
                        <span className="block whitespace-nowrap">Beside Sai Hanuman Temple, Begumpet,</span>
                        <span className="block whitespace-nowrap">Hyderabad, Telangana - 500016</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full text-primary shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">Phone</h4>
                      <p className="text-gray-600 text-xs md:text-sm">+91 88868 88275</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full text-primary shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">Email</h4>
                      <p className="text-gray-600 text-xs md:text-sm break-all">dawnbudsmodelschool@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full text-primary shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">Office Hours</h4>
                      <p className="text-gray-600 text-xs md:text-sm">Mon - Sat: 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-48 md:h-64 rounded-2xl overflow-hidden shadow-inner">
                <iframe 
                  src="https://www.google.com/maps?q=Dawn+Buds+Model+School+1-11-110/17/B/9+Shyamlal+Building+Beside+Sai+Hanuman+Temple+Begumpet+Hyderabad&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Careers Form */}
            <div>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-secondary mb-2">Join Our Team</h2>
                <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">We are always looking for passionate educators.</p>
                
                <Form {...careerForm}>
                  <form onSubmit={careerForm.handleSubmit(onCareerSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={careerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={careerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl><Input placeholder="+91..." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={careerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input placeholder="jane@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={careerForm.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position Applied For</FormLabel>
                            <FormControl><Input placeholder="e.g. Math Teacher" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={careerForm.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience (Years)</FormLabel>
                            <FormControl><Input placeholder="e.g. 3 Years" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={careerForm.control}
                      name="resumeLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume Link (Google Drive/LinkedIn) <span className="text-destructive">*</span></FormLabel>
                          <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={careerForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter / Message</FormLabel>
                          <FormControl><Textarea className="resize-none" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
