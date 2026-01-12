import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertCareer } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateCareer() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertCareer) => {
      const validated = api.careers.create.input.parse(data);
      const res = await fetch(api.careers.create.path, {
        method: api.careers.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to submit application');
      }
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Received",
        description: "Thank you for your interest in joining our team.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
