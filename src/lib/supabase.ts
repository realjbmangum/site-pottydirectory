import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types matching your existing schema
export interface Vendor {
  id: string;
  business_name: string;
  city: string;
  state: string;
  phone: string;
  website: string | null;
  services_offered: string[];
  slug: string;
  created_at: string;
}

export interface Submission {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  services_offered: string[];
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Helper functions
export async function getVendors(state?: string) {
  let query = supabase
    .from('vendors')
    .select('*')
    .order('business_name');

  if (state) {
    query = query.eq('state', state);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Vendor[];
}

export async function getVendorBySlug(slug: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Vendor;
}

export async function getVendorsByState(state: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('state', state)
    .order('city')
    .order('business_name');

  if (error) throw error;
  return data as Vendor[];
}

export async function getVendorCountByState() {
  const { data, error } = await supabase
    .from('vendors')
    .select('state');

  if (error) throw error;

  const counts: Record<string, number> = {};
  data?.forEach((vendor) => {
    counts[vendor.state] = (counts[vendor.state] || 0) + 1;
  });
  return counts;
}

export async function getFeaturedVendors(limit = 6) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .limit(limit);

  if (error) throw error;
  return data as Vendor[];
}

export async function submitVendor(submission: Omit<Submission, 'id' | 'status' | 'created_at'>) {
  const { data, error } = await supabase
    .from('submissions')
    .insert([submission])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function sendContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
    .single();

  if (error) throw error;
  return data;
}
