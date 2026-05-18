import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeadStatus = "pending" | "good" | "bad";

export interface Request {
  id: string;
  name: string;
  phone: string;
  project_description: string;
  budget: string;
  lead_status: LeadStatus;
  created_at: string;
}
