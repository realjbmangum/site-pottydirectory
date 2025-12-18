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
  email?: string;
  website: string | null;
  services_offered: string[];
  slug: string;
  latitude?: number;
  longitude?: number;
  street_address?: string;
  postal_code?: string;
  rating?: number;
  review_count?: number;
  photo_url?: string;
  hours?: Record<string, string>;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  description?: string;
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
    .from('potty')
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
    .from('potty')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Vendor;
}

export async function getVendorsByState(state: string) {
  const { data, error } = await supabase
    .from('potty')
    .select('*')
    .eq('state', state)
    .order('city')
    .order('business_name');

  if (error) throw error;
  return data as Vendor[];
}

export async function getVendorCountByState() {
  const { data, error } = await supabase
    .from('potty')
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
    .from('potty')
    .select('*')
    .limit(limit);

  if (error) throw error;
  return data as Vendor[];
}

export async function getVendorsByCity(state: string, city: string) {
  const { data, error } = await supabase
    .from('potty')
    .select('*')
    .eq('state', state)
    .eq('city', city)
    .order('business_name');

  if (error) throw error;
  return data as Vendor[];
}

export async function getCitiesByState(state: string) {
  const { data, error } = await supabase
    .from('potty')
    .select('city, state')
    .eq('state', state);

  if (error) throw error;

  // Get unique cities with counts
  const cityCounts: Record<string, number> = {};
  data?.forEach((vendor) => {
    cityCounts[vendor.city] = (cityCounts[vendor.city] || 0) + 1;
  });

  return Object.entries(cityCounts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => a.city.localeCompare(b.city));
}

export async function getAllCitiesWithState() {
  const { data, error } = await supabase
    .from('potty')
    .select('city, state');

  if (error) throw error;

  // Get unique city-state combinations
  const cityStateMap = new Map<string, { city: string; state: string; count: number }>();
  data?.forEach((vendor) => {
    const key = `${vendor.city}-${vendor.state}`;
    if (cityStateMap.has(key)) {
      cityStateMap.get(key)!.count++;
    } else {
      cityStateMap.set(key, { city: vendor.city, state: vendor.state, count: 1 });
    }
  });

  return Array.from(cityStateMap.values());
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

// Content types
export interface ContentQuestion {
  id: string;
  site_id: string;
  question: string;
  category: string;
  source: string;
  priority: string;
  score: number;
  content_type: string;
  status: string;
  answer_short: string | null;
  answer_long: string | null;
  suggested_word_count: number;
  published_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Get published FAQs for the site
export async function getPublishedFAQs(siteId: string = 'potty') {
  const { data, error } = await supabase
    .from('content_questions')
    .select('*')
    .eq('site_id', siteId)
    .eq('status', 'published')
    .eq('content_type', 'faq')
    .order('category')
    .order('priority', { ascending: false })
    .order('score', { ascending: false });

  if (error) throw error;
  return data as ContentQuestion[];
}

// Get published blog posts for the site
export async function getPublishedBlogs(siteId: string = 'potty') {
  const { data, error } = await supabase
    .from('content_questions')
    .select('*')
    .eq('site_id', siteId)
    .eq('status', 'published')
    .eq('content_type', 'blog')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data as ContentQuestion[];
}

// Helper to create slug from question
export function questionToSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Spaces to dashes
    .replace(/-+/g, '-') // Multiple dashes to single
    .slice(0, 60) // Limit length
    .replace(/-$/, ''); // Remove trailing dash
}

// Get a single blog post by ID
export async function getBlogById(id: string, siteId: string = 'potty') {
  const { data, error } = await supabase
    .from('content_questions')
    .select('*')
    .eq('id', id)
    .eq('site_id', siteId)
    .eq('status', 'published')
    .eq('content_type', 'blog')
    .single();

  if (error) throw error;
  return data as ContentQuestion;
}

export async function getSiteStats() {
  const { data, error, count } = await supabase
    .from('potty')
    .select('state, rating', { count: 'exact' });

  if (error) throw error;

  // Count unique states
  const uniqueStates = new Set(data?.map(v => v.state) || []);

  // Calculate average rating (only vendors with ratings)
  const ratingsData = data?.filter(v => v.rating && v.rating > 0) || [];
  const avgRating = ratingsData.length > 0
    ? ratingsData.reduce((sum, v) => sum + (v.rating || 0), 0) / ratingsData.length
    : 0;

  return {
    providers: count || 0,
    states: uniqueStates.size,
    avgRating: avgRating.toFixed(1)
  };
}
