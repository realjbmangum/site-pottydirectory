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
  hours?: Record<string, string> | string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  description?: string;
  featured?: boolean;
  verified?: boolean;
  // Feature flags
  has_luxury?: boolean;
  has_ada?: boolean;
  has_trailer?: boolean;
  serves_construction?: boolean;
  serves_events?: boolean;
  enriched_at?: string;
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
  // Fetch all vendors - Supabase default limit is 1000, so we need to paginate
  const allVendors: Vendor[] = [];
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    let query = supabase
      .from('potty')
      .select('*')
      .order('business_name')
      .range(offset, offset + pageSize - 1);

    if (state) {
      query = query.eq('state', state);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (data && data.length > 0) {
      allVendors.push(...(data as Vendor[]));
      offset += pageSize;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  return allVendors;
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

export async function getVendorsByStateWithCoords(state: string): Promise<Vendor[]> {
  // Fetch vendors with coordinates for map display
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;
  const allVendors: Vendor[] = [];

  while (hasMore) {
    const { data, error } = await supabase
      .from('potty')
      .select(`
        id, business_name, slug, city, state, phone,
        latitude, longitude, rating, review_count,
        has_luxury, has_ada, has_trailer, serves_construction, serves_events,
        website, verified
      `)
      .eq('state', state)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    if (data && data.length > 0) {
      allVendors.push(...(data as Vendor[]));
      offset += pageSize;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  return allVendors;
}

export async function getAllVendorsWithCoords(): Promise<Vendor[]> {
  // Fetch all vendors with coordinates for national map
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;
  const allVendors: Vendor[] = [];

  while (hasMore) {
    const { data, error } = await supabase
      .from('potty')
      .select(`
        id, business_name, slug, city, state, phone,
        latitude, longitude, rating, review_count,
        has_luxury, has_ada, has_trailer, serves_construction, serves_events,
        website, verified
      `)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    if (data && data.length > 0) {
      allVendors.push(...(data as Vendor[]));
      offset += pageSize;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  return allVendors;
}

export async function getVendorCountByState() {
  // Paginate to get all vendors (Supabase default limit is 1000)
  const allData: { state: string }[] = [];
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('potty')
      .select('state')
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    if (data && data.length > 0) {
      allData.push(...data);
      offset += pageSize;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  const counts: Record<string, number> = {};
  allData.forEach((vendor) => {
    counts[vendor.state] = (counts[vendor.state] || 0) + 1;
  });
  return counts;
}

export async function getFeaturedVendors(limit = 6) {
  // First try to get explicitly featured vendors
  const { data, error } = await supabase
    .from('potty')
    .select('*')
    .eq('featured', true)
    .limit(limit);

  if (error) throw error;

  // If we have featured vendors, return them
  if (data && data.length > 0) {
    return data as Vendor[];
  }

  // Fallback: get highest rated vendors with good review counts
  const { data: fallbackData, error: fallbackError } = await supabase
    .from('potty')
    .select('*')
    .gte('rating', 4.5)
    .gte('review_count', 10)
    .order('rating', { ascending: false })
    .order('review_count', { ascending: false })
    .limit(limit);

  if (fallbackError) throw fallbackError;
  return (fallbackData || []) as Vendor[];
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

// Get a single FAQ by slug
export async function getFAQBySlug(slug: string, siteId: string = 'potty') {
  // First get all FAQs, then find by matching slug
  const faqs = await getPublishedFAQs(siteId);
  return faqs.find(faq => questionToSlug(faq.question) === slug) || null;
}

// Get related FAQs (same category, excluding current)
export async function getRelatedFAQs(currentId: string, category: string, siteId: string = 'potty', limit: number = 5) {
  const { data, error } = await supabase
    .from('content_questions')
    .select('*')
    .eq('site_id', siteId)
    .eq('status', 'published')
    .eq('content_type', 'faq')
    .eq('category', category)
    .neq('id', currentId)
    .order('score', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as ContentQuestion[];
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

// City content interface
export interface CityContent {
  id: string;
  city: string;
  state: string;
  intro_paragraph: string | null;
  local_tips: string | null;
  peak_season: string | null;
  popular_for: string[] | null;
  status: 'draft' | 'review' | 'published';
  created_at: string;
  updated_at: string;
}

// Get city content for SEO
export async function getCityContent(city: string, state: string): Promise<CityContent | null> {
  const { data, error } = await supabase
    .from('city_content')
    .select('*')
    .eq('city', city)
    .eq('state', state)
    .eq('status', 'published')
    .single();

  if (error) {
    // Not found is okay, return null
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching city content:', error);
    return null;
  }
  return data as CityContent;
}

export async function getSiteStats() {
  // Paginate to get all vendors for accurate stats
  const allData: { state: string; rating: number | null }[] = [];
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('potty')
      .select('state, rating')
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    if (data && data.length > 0) {
      allData.push(...data);
      offset += pageSize;
      hasMore = data.length === pageSize;
    } else {
      hasMore = false;
    }
  }

  // Count unique states
  const uniqueStates = new Set(allData.map(v => v.state));

  // Calculate average rating (only vendors with ratings)
  const ratingsData = allData.filter(v => v.rating && v.rating > 0);
  const avgRating = ratingsData.length > 0
    ? ratingsData.reduce((sum, v) => sum + (v.rating || 0), 0) / ratingsData.length
    : 0;

  return {
    providers: allData.length,
    states: uniqueStates.size,
    avgRating: avgRating.toFixed(1)
  };
}
