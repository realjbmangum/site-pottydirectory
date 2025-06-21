import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your vendors table
export interface Vendor {
  id: string
  name: string
  city: string
  state: string
  address?: string
  phone?: string
  email?: string
  website?: string
  description?: string
  features: {
    urinal: boolean
    handWashing: boolean
    sanitizer: boolean
    lockingDoor: boolean
    mirror: boolean
  }
  type: "Standard" | "Luxury"
  dailyRate: 1 | 2 | 3 | 4
  slug: string
  latitude?: number
  longitude?: number
  serviceAreas?: string[]
  rating?: number
  reviewCount?: number
  yearsInBusiness?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}
