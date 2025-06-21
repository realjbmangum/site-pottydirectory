import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks and validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validate environment variables
if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Only create client if we have valid credentials
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Basic vendor interface - customize this based on your actual table structure
export interface Vendor {
  id: string
  name: string
  city: string
  state: string
  // Add other fields from your vendors table here:
  // phone?: string
  // email?: string
  // website?: string
  // description?: string
  // etc.
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabase)
}
