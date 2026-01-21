import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env (project root). Restart the dev server after changing .env."
  );
}

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
