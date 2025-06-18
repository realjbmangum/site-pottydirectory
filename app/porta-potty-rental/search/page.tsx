"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin, Filter, SlidersHorizontal, Loader2 } from "lucide-react"
import SearchBar from "@/components/search-bar"
import VendorCard from "@/components/vendor-card"
import { Button } from "@/components/ui/button"
import { zipCodeService, type LocationSearchResult } from "@/lib/zip-code-service"

// Mock search data with coordinates for distance calculation
const mockVendors = [
  {
    id: "fl-1",
    name: "Miami Premium Porta Potty Rental",
    city: "Miami",
    state: "FL",
    latitude: 25.7617,
    longitude: -80.1918,
    features: {
      urinal: true,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: true,
    },
    type: "Luxury" as const,
    dailyRate: 4 as const,
    slug: "miami-premium-porta-potty-rental-fl",
  },
  {
    id: "tx-1",
    name: "Austin Event Porta Potty Rental",
    city: "Austin",
    state: "TX",
    latitude: 30.2672,
    longitude: -97.7431,
    features: {
      urinal: false,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: false,
    },
    type: "Standard" as const,
    dailyRate: 2 as const,
    slug: "austin-event-porta-potty-rental-tx",
  },
  {
    id: "ca-1",
    name: "Los Angeles Luxury Porta Potty Rental",
    city: "Los Angeles",
    state: "CA",
    latitude: 34.0522,
    longitude: -118.2437,
    features: {
      urinal: true,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: true,
    },
    type: "Luxury" as const,
    dailyRate: 4 as const,
    slug: "los-angeles-luxury-porta-potty-rental-ca",
  },
  {
    id: "nc-1",
    name: "Charlotte Premium Porta Potty Services",
    city: "Charlotte",
    state: "NC",
    latitude: 35.2271,
    longitude: -80.8431,
    features: {
      urinal: true,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: true,
    },
    type: "Luxury" as const,
    dailyRate: 3 as const,
    slug: "charlotte-premium-porta-potty-services-nc",
  },
  {
    id: "tx-2",
    name: "Dallas Premium Portable Restrooms",
    city: "Dallas",
    state: "TX",
    latitude: 32.7767,
    longitude: -96.797,
    features: {
      urinal: true,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: true,
    },
    type: "Luxury" as const,
    dailyRate: 4 as const,
    slug: "dallas-premium-portable-restrooms-tx",
  },
  {
    id: "fl-2",
    name: "Orlando Event Restroom Solutions",
    city: "Orlando",
    state: "FL",
    latitude: 28.5383,
    longitude: -81.3792,
    features: {
      urinal: false,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: false,
    },
    type: "Standard" as const,
    dailyRate: 2 as const,
    slug: "orlando-event-restroom-solutions-fl",
  },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [filteredVendors, setFilteredVendors] = useState(mockVendors)
  const [isLoading, setIsLoading] = useState(false)
  const [searchLocation, setSearchLocation] = useState<LocationSearchResult | null>(null)
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    radius: "all", // New radius filter
    features: {
      handWashing: false,
      sanitizer: false,
      luxury: false,
    },
  })
  const [showFilters, setShowFilters] = useState(false)

  // Search and filter logic
  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setFilteredVendors(mockVendors)
        return
      }

      setIsLoading(true)
      let results = mockVendors

      try {
        // Parse the search query
        const parsedLocation = zipCodeService.parseSearchQuery(query)
        setSearchLocation(parsedLocation)

        if (parsedLocation?.type === "zipcode" && parsedLocation.location.zipCode) {
          // Handle zip code search
          const zipData = await zipCodeService.getLocationFromZipCode(parsedLocation.location.zipCode)

          if (zipData) {
            // Update search location with zip code data
            setSearchLocation({
              ...parsedLocation,
              location: {
                city: zipData.city,
                state: zipData.state,
                stateCode: zipData.stateCode,
                zipCode: zipData.zipCode,
                latitude: zipData.latitude,
                longitude: zipData.longitude,
              },
            })

            // Filter by proximity if we have coordinates
            if (filters.radius !== "all") {
              const radiusMap = { "10": 10, "25": 25, "50": 50, "100": 100 }
              const maxDistance = radiusMap[filters.radius as keyof typeof radiusMap]

              if (maxDistance) {
                results = results.filter((vendor) => {
                  const distance = zipCodeService.calculateDistance(
                    zipData.latitude,
                    zipData.longitude,
                    vendor.latitude,
                    vendor.longitude,
                  )
                  return distance <= maxDistance
                })
              }
            } else {
              // Default to state-level search for zip codes
              results = results.filter((vendor) => vendor.state.toLowerCase() === zipData.stateCode.toLowerCase())
            }
          }
        } else {
          // Handle city/state text search
          results = results.filter(
            (vendor) =>
              vendor.name.toLowerCase().includes(query.toLowerCase()) ||
              vendor.city.toLowerCase().includes(query.toLowerCase()) ||
              vendor.state.toLowerCase().includes(query.toLowerCase()),
          )
        }

        // Apply other filters
        if (filters.type !== "all") {
          results = results.filter((vendor) => vendor.type.toLowerCase() === filters.type)
        }

        if (filters.priceRange !== "all") {
          const priceMap = { budget: [1, 2], mid: [2, 3], premium: [3, 4] }
          const range = priceMap[filters.priceRange as keyof typeof priceMap]
          if (range) {
            results = results.filter((vendor) => vendor.dailyRate >= range[0] && vendor.dailyRate <= range[1])
          }
        }

        if (filters.features.handWashing) {
          results = results.filter((vendor) => vendor.features.handWashing)
        }
        if (filters.features.sanitizer) {
          results = results.filter((vendor) => vendor.features.sanitizer)
        }
        if (filters.features.luxury) {
          results = results.filter((vendor) => vendor.type === "Luxury")
        }

        setFilteredVendors(results)
      } catch (error) {
        console.error("Search error:", error)
        setFilteredVendors([])
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [query, filters])

  const handleSearch = (newQuery: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set("q", newQuery)
    window.history.pushState({}, "", url.toString())
  }

  const getSearchTitle = () => {
    if (!query) return "Search Porta Potty Rentals"

    if (searchLocation?.type === "zipcode" && searchLocation.location.city) {
      return `Porta Potty Rentals in ${searchLocation.location.city}, ${searchLocation.location.stateCode}`
    }

    return `Search Results for "${query}"`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{getSearchTitle()}</h1>
            <p className="text-gray-600">Find the perfect porta potty rental for your needs</p>
            {searchLocation?.type === "zipcode" && searchLocation.location.city && (
              <p className="text-sm text-primary-600 mt-2">
                📍 Showing results for {searchLocation.location.zipCode} - {searchLocation.location.city},{" "}
                {searchLocation.location.stateCode}
              </p>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by zip code, city, state, or company name..."
              className="max-w-2xl"
            />
          </div>

          {/* Results Count & Filter Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Searching...
                </span>
              ) : (
                `${filteredVendors.length} porta potty rental compan${filteredVendors.length !== 1 ? "ies" : "y"} found`
              )}
            </p>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Radius Filter (only show for zip code searches) */}
              {searchLocation?.type === "zipcode" && searchLocation.location.latitude && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Distance</h4>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "Entire State" },
                      { value: "10", label: "Within 10 miles" },
                      { value: "25", label: "Within 25 miles" },
                      { value: "50", label: "Within 50 miles" },
                      { value: "100", label: "Within 100 miles" },
                    ].map((radius) => (
                      <label key={radius.value} className="flex items-center">
                        <input
                          type="radio"
                          name="radius"
                          value={radius.value}
                          checked={filters.radius === radius.value}
                          onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{radius.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Type</h4>
                <div className="space-y-2">
                  {["all", "standard", "luxury"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={filters.type === type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {type === "all" ? "All Types" : type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "budget", label: "Budget ($-$$)" },
                    { value: "mid", label: "Mid-Range ($$-$$$)" },
                    { value: "premium", label: "Premium ($$$-$$$$)" },
                  ].map((price) => (
                    <label key={price.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={price.value}
                        checked={filters.priceRange === price.value}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                <div className="space-y-2">
                  {[
                    { key: "handWashing", label: "Hand Washing Station" },
                    { key: "sanitizer", label: "Hand Sanitizer" },
                    { key: "luxury", label: "Luxury Units Only" },
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features[feature.key as keyof typeof filters.features]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            features: {
                              ...filters.features,
                              [feature.key]: e.target.checked,
                            },
                          })
                        }
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    type: "all",
                    priceRange: "all",
                    radius: "all",
                    features: { handWashing: false, sanitizer: false, luxury: false },
                  })
                }
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
                <p className="text-gray-600">Searching for porta potty rentals...</p>
              </div>
            ) : filteredVendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find porta potty rentals in your area.
                </p>
                <Button
                  onClick={() => {
                    setFilters({
                      type: "all",
                      priceRange: "all",
                      radius: "all",
                      features: { handWashing: false, sanitizer: false, luxury: false },
                    })
                    const url = new URL(window.location.href)
                    url.searchParams.delete("q")
                    window.history.pushState({}, "", url.toString())
                  }}
                >
                  Clear Search & Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  )
}
