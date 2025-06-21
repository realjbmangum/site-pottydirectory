import { supabase, type Vendor } from "./supabase"

export class VendorService {
  // Get all vendors
  async getAllVendors(): Promise<Vendor[]> {
    const { data, error } = await supabase.from("vendors").select("*").eq("isActive", true).order("name")

    if (error) {
      console.error("Error fetching vendors:", error)
      return []
    }

    return data || []
  }

  // Get vendors by state
  async getVendorsByState(stateCode: string): Promise<Vendor[]> {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("state", stateCode.toUpperCase())
      .eq("isActive", true)
      .order("name")

    if (error) {
      console.error("Error fetching vendors by state:", error)
      return []
    }

    return data || []
  }

  // Get vendor by slug
  async getVendorBySlug(slug: string): Promise<Vendor | null> {
    const { data, error } = await supabase.from("vendors").select("*").eq("slug", slug).eq("isActive", true).single()

    if (error) {
      console.error("Error fetching vendor by slug:", error)
      return null
    }

    return data
  }

  // Search vendors with filters
  async searchVendors(params: {
    query?: string
    state?: string
    city?: string
    type?: string
    features?: string[]
    priceRange?: [number, number]
    latitude?: number
    longitude?: number
    radius?: number
  }): Promise<Vendor[]> {
    let query = supabase.from("vendors").select("*").eq("isActive", true)

    // Text search
    if (params.query) {
      query = query.or(`name.ilike.%${params.query}%,city.ilike.%${params.query}%,description.ilike.%${params.query}%`)
    }

    // State filter
    if (params.state) {
      query = query.eq("state", params.state.toUpperCase())
    }

    // City filter
    if (params.city) {
      query = query.ilike("city", `%${params.city}%`)
    }

    // Type filter
    if (params.type && params.type !== "all") {
      query = query.eq("type", params.type)
    }

    // Price range filter
    if (params.priceRange) {
      query = query.gte("dailyRate", params.priceRange[0]).lte("dailyRate", params.priceRange[1])
    }

    // Geographic search with radius (requires PostGIS extension)
    if (params.latitude && params.longitude && params.radius) {
      // This requires a custom RPC function in Supabase
      const { data, error } = await supabase.rpc("vendors_within_radius", {
        center_lat: params.latitude,
        center_lng: params.longitude,
        radius_miles: params.radius,
      })

      if (error) {
        console.error("Error with radius search:", error)
        // Fallback to regular query
      } else {
        return data || []
      }
    }

    const { data, error } = await query.order("name")

    if (error) {
      console.error("Error searching vendors:", error)
      return []
    }

    // Filter by features (client-side for now)
    let results = data || []
    if (params.features && params.features.length > 0) {
      results = results.filter((vendor) => {
        return params.features!.every((feature) => vendor.features[feature as keyof typeof vendor.features])
      })
    }

    return results
  }

  // Get featured vendors (top-rated or manually selected)
  async getFeaturedVendors(limit = 6): Promise<Vendor[]> {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("isActive", true)
      .order("rating", { ascending: false })
      .order("reviewCount", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching featured vendors:", error)
      return []
    }

    return data || []
  }

  // Add a new vendor
  async addVendor(vendor: Omit<Vendor, "id" | "createdAt" | "updatedAt">): Promise<Vendor | null> {
    const { data, error } = await supabase.from("vendors").insert([vendor]).select().single()

    if (error) {
      console.error("Error adding vendor:", error)
      return null
    }

    return data
  }

  // Update vendor
  async updateVendor(id: string, updates: Partial<Vendor>): Promise<Vendor | null> {
    const { data, error } = await supabase.from("vendors").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Error updating vendor:", error)
      return null
    }

    return data
  }
}

export const vendorService = new VendorService()
