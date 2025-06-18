import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import VendorCard from "@/components/vendor-card"
import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Florida Porta Potty Rental - Best Portable Restroom Companies in FL",
  description:
    "Find reliable porta potty rental companies in Florida. Compare prices, features, and book portable restroom rentals for events, construction sites, and outdoor gatherings across FL.",
  keywords: [
    "florida porta potty rental",
    "portable restroom rental florida",
    "porta potty rental FL",
    "florida portable toilet rental",
    "event porta potty rental florida",
    "construction porta potty rental florida",
  ],
  openGraph: {
    title: "Florida Porta Potty Rental - Best Portable Restroom Companies in FL",
    description:
      "Find reliable porta potty rental companies in Florida. Compare prices and book portable restroom rentals across FL.",
    url: "https://portapottypro.com/porta-potty-rental/states/florida-porta-potty-rental",
  },
}

// Mock vendor data for Florida
const floridaVendors = [
  {
    id: "fl-1",
    name: "Miami Premium Porta Potty Rental",
    city: "Miami",
    state: "FL",
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
    id: "fl-2",
    name: "Orlando Event Restroom Solutions",
    city: "Orlando",
    state: "FL",
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

// Mock cities data for Florida
const floridaCities = [
  { name: "Miami", vendorCount: 23, slug: "miami-porta-potty-rental" },
  { name: "Orlando", vendorCount: 18, slug: "orlando-porta-potty-rental" },
  { name: "Tampa", vendorCount: 15, slug: "tampa-porta-potty-rental" },
  { name: "Jacksonville", vendorCount: 12, slug: "jacksonville-porta-potty-rental" },
  { name: "Fort Lauderdale", vendorCount: 9, slug: "fort-lauderdale-porta-potty-rental" },
  { name: "St. Petersburg", vendorCount: 8, slug: "st-petersburg-porta-potty-rental" },
  { name: "Tallahassee", vendorCount: 6, slug: "tallahassee-porta-potty-rental" },
  { name: "Naples", vendorCount: 5, slug: "naples-porta-potty-rental" },
]

export default function FloridaPortaPottyRentalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        {/* Florida Flag Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://flagcdn.com/w320/us-fl.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="heading-xl text-gray-900">Florida Porta Potty Rental</h1>
              <p className="body-lg text-gray-600 max-w-3xl mx-auto">
                Find reliable porta potty rental companies across Florida. Compare prices, features, and book portable
                restroom rentals for your events, construction sites, and outdoor gatherings in the Sunshine State.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center">
              <SearchBar placeholder="Search Florida cities for porta potty rental..." />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">134</div>
                <div className="text-sm text-gray-600">Verified Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">50+</div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Featured Florida Porta Potty Rental Companies</h2>
            <p className="body-md text-gray-600 max-w-3xl mx-auto">
              Top-rated portable restroom rental companies serving Florida with excellent customer reviews and
              competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {floridaVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200">
              View All Florida Porta Potty Rental Companies
            </Button>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Porta Potty Rental by Florida City</h2>
            <p className="body-md text-gray-600 max-w-3xl mx-auto">
              Browse porta potty rental companies by city across Florida. Find local portable restroom services in your
              area.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {floridaCities.map((city) => (
              <Link
                key={city.slug}
                href={`/porta-potty-rental/florida/${city.slug}`}
                className="glass-effect rounded-xl p-6 hover:shadow-modern-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {city.name}
                  </h3>
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600 mb-3">{city.vendorCount} porta potty rental companies</p>
                <div className="flex items-center text-primary-600 text-sm font-medium">
                  <span>View {city.name} Rentals</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-lg text-white mb-6">Florida Porta Potty Rental Business?</h2>
          <p className="body-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our directory and connect with customers looking for porta potty rentals across Florida.
          </p>
          <Button
            asChild
            className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
          >
            <Link href="/porta-potty-rental/add-business">
              List Your Florida Business
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
