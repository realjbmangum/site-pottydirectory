"use client"

import { useEffect, useState } from "react"
import { supabase, isSupabaseConfigured, type Vendor } from "@/lib/supabase"
import { MapPin, Loader2, AlertCircle, Database } from "lucide-react"

export default function VendorsGrid() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVendors() {
      try {
        setLoading(true)
        setError(null)

        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          throw new Error("Supabase is not configured. Please check your environment variables.")
        }

        if (!supabase) {
          throw new Error("Supabase client is not initialized")
        }

        const { data, error: supabaseError } = await supabase.from("vendors").select("*").order("name")

        if (supabaseError) {
          throw supabaseError
        }

        setVendors(data || [])
      } catch (err) {
        console.error("Error fetching vendors:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch vendors")
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  // Show configuration error
  if (!isSupabaseConfigured()) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-yellow-800">Supabase Configuration Required</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Please add the following environment variables to your project:</p>
                  <ul className="mt-2 list-disc list-inside space-y-1 font-mono text-xs bg-yellow-100 p-3 rounded">
                    <li>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</li>
                    <li>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</li>
                  </ul>
                  <p className="mt-2">Current values:</p>
                  <ul className="mt-1 text-xs font-mono bg-yellow-100 p-2 rounded">
                    <li>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing"}</li>
                    <li>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <span className="ml-2 text-gray-600">Loading vendors...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-red-800">Database Error</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <p className="mt-2 text-xs text-red-600">
                  Make sure your Supabase credentials are correct and the 'vendors' table exists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (vendors.length === 0) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-600">The vendors table exists but contains no data.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">All Vendors</h2>
          <p className="text-gray-600">
            Found {vendors.length} vendor{vendors.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
            >
              {/* Vendor Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{vendor.name}</h3>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-2 text-primary-600 flex-shrink-0" />
                <span className="text-sm">
                  {vendor.city}, {vendor.state}
                </span>
              </div>

              {/* Action Button - Customize this section */}
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
