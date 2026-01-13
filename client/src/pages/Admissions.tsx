import { PageHeader } from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Minimal schema for the inquiry form frontend
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().optional(),
  classInterest: z.string().min(1, "Please select a class"),
});

export default function Admissions() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      classInterest: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Get API URL from environment or use default
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${API_URL}/api/admission-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }

      form.reset();
      toast({
        title: "Inquiry Sent Successfully!",
        description: "We have received your message and will contact you shortly.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error 
          ? error.message 
          : "Failed to submit inquiry. Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* admission paperwork */}
      <PageHeader 
        title="Admissions" 
        subtitle="Join the Dawn Buds family. Applications open for Academic Year 2024-25."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* Left Column: Process & Info */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary mb-4 md:mb-6">Admission Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    { step: "01", title: "Inquiry", desc: "Fill out the online form or visit campus." },
                    { step: "02", title: "Interaction", desc: "Student interaction/assessment for grade placement." },
                    { step: "03", title: "Documentation", desc: "Submit required documents (Birth Cert, TC, Photos)." },
                    { step: "04", title: "Fee Payment", desc: "Pay admission fee to confirm seat." },
                  ].map((item) => (
                    <div key={item.step} className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3 md:gap-4">
                      <span className="text-3xl md:text-4xl font-bold text-primary/10 shrink-0">{item.step}</span>
                      <div>
                        <h4 className="font-bold text-secondary text-base md:text-lg">{item.title}</h4>
                        <p className="text-gray-600 text-xs md:text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary mb-4 md:mb-6">Age Criteria</h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[300px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 md:p-4 font-bold text-secondary text-xs md:text-sm uppercase tracking-wider">Class</th>
                        <th className="p-3 md:p-4 font-bold text-secondary text-xs md:text-sm uppercase tracking-wider">Age (as of June 1st)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="p-3 md:p-4 text-sm md:text-base">Nursery</td><td className="p-3 md:p-4 text-sm md:text-base">3+ Years</td></tr>
                      <tr><td className="p-3 md:p-4 text-sm md:text-base">LKG</td><td className="p-3 md:p-4 text-sm md:text-base">4+ Years</td></tr>
                      <tr><td className="p-3 md:p-4 text-sm md:text-base">UKG</td><td className="p-3 md:p-4 text-sm md:text-base">5+ Years</td></tr>
                      <tr><td className="p-3 md:p-4 text-sm md:text-base">Class 1</td><td className="p-3 md:p-4 text-sm md:text-base">6+ Years</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-secondary mb-4 md:mb-6">FAQs</h2>
                <Accordion type="single" collapsible className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What are the school timings?</AccordionTrigger>
                    <AccordionContent>
                      Nursery to UKG: 8:30 AM to 12:30 PM. <br/>
                      Class 1 to 10: 8:30 AM to 3:30 PM.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is transport facility available?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we provide safe transport facilities covering 5km radius around Begumpet area.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is the fee structure?</AccordionTrigger>
                    <AccordionContent>
                      The fee structure varies by grade. Please fill out the inquiry form to receive the detailed fee card.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-primary/10 lg:sticky lg:top-24">
                <h3 className="text-xl md:text-2xl font-display font-bold text-secondary mb-2">Admission Inquiry</h3>
                <p className="text-gray-500 mb-4 md:mb-6 text-xs md:text-sm">Fill this form to request a callback or brochure.</p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent's Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 88868 88275" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="classInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Interested</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nursery">Nursery</SelectItem>
                              <SelectItem value="lkg">LKG</SelectItem>
                              <SelectItem value="ukg">UKG</SelectItem>
                              <SelectItem value="class1">Class 1</SelectItem>
                              <SelectItem value="class5">Class 5</SelectItem>
                              <SelectItem value="class10">Class 10</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any specific questions?" className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
