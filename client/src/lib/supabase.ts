import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jqycypjkiznadzvhkilp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeWN5cGpraXpuYWR6dmhraWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0NjEsImV4cCI6MjA4NDQ3ODQ2MX0.sR6uN_vH_NIBiSPP-3z5pB2QAwEwybB6SsyUBB0927c";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type GalleryRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
  created_by: string | null;
};

export type NewsRow = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  sort_order: number;
  published_at: string;
  created_by: string | null;
};

export type AchievementRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  achievement_type: string;
  sort_order: number;
  created_at: string;
  created_by: string | null;
};

export type AdmissionInquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  class_interest: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
};

export type CareerApplicationRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string | null;
  resume_link: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
};
