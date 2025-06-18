import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import VendorCard from "@/components/vendor-card"
import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "California Porta Potty Rental - Best Portable Restroom Companies in CA",
  description:
    "Find reliable porta potty rental companies in California. Compare prices, features, and book portable restroom rentals for events, construction sites, and outdoor gatherings across CA.",
  keywords: [
    "california porta potty rental",
    "portable restroom rental california",
    "porta potty rental CA",
    "california portable toilet rental",
    "event porta potty rental california",
    "construction porta potty rental california",
  ],
  openGraph: {
    title: "California Porta Potty Rental - Best Portable Restroom Companies in CA",
    description:
      "Find reliable porta potty rental companies in California. Compare prices and book portable restroom rentals across CA.",
    url: "https://portapottypro.com/porta-potty-rental/states/california-porta-potty-rental",
  },
}

// Mock vendor data for California
const californiaVendors = [
  {
    id: "ca-1",
    name: "Los Angeles Luxury Porta Potty Rental",
    city: "Los Angeles",
    state: "CA",
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
    id: "ca-2",
    name: "San Francisco Bay Area Portable Restrooms",
    city: "San Francisco",
    state: "CA",
    features: {
      urinal: true,
      handWashing: false,
      sanitizer: true,
      lockingDoor: true,
      mirror: false,
    },
    type: "Standard" as const,
    dailyRate: 3 as const,
    slug: "san-francisco-bay-area-portable-restrooms-ca",
  },
]

// Mock cities data for California
const californiaCities = [
  { name: "Los Angeles", vendorCount: 42, slug: "los-angeles-porta-potty-rental" },
  { name: "San Francisco", vendorCount: 28, slug: "san-francisco-porta-potty-rental" },
  { name: "San Diego", vendorCount: 24, slug: "san-diego-porta-potty-rental" },
  { name: "Sacramento", vendorCount: 18, slug: "sacramento-porta-potty-rental" },
  { name: "Oakland", vendorCount: 16, slug: "oakland-porta-potty-rental" },
  { name: "Fresno", vendorCount: 12, slug: "fresno-porta-potty-rental" },
  { name: "Long Beach", vendorCount: 10, slug: "long-beach-porta-potty-rental" },
  { name: "Anaheim", vendorCount: 8, slug: "anaheim-porta-potty-rental" },
]

export default function CaliforniaPortaPottyRentalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        {/* California Flag Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://flagcdn.com/w320/us-ca.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="heading-xl text-gray-900">California Porta Potty Rental</h1>
              <p className="body-lg text-gray-600 max-w-3xl mx-auto">
                Find reliable porta potty rental companies across California. Compare prices, features, and book
                portable restroom rentals for your events, construction sites, and outdoor gatherings in the Golden
                State.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center">
              <SearchBar placeholder="Search California cities for porta potty rental..." />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">156</div>
                <div className="text-sm text-gray-600">Verified Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">60+</div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.7★</div>
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
            <h2 className="heading-lg text-gray-900 mb-4">Featured California Porta Potty Rental Companies</h2>
            <p className="body-md text-gray-600 max-w-3xl mx-auto">
              Top-rated portable restroom rental companies serving California with excellent customer reviews and
              competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {californiaVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200">
              View All California Porta Potty Rental Companies
            </Button>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Porta Potty Rental by California City</h2>
            <p className="body-md text-gray-600 max-w-3xl mx-auto">
              Browse porta potty rental companies by city across California. Find local portable restroom services in
              your area.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {californiaCities.map((city) => (
              <Link
                key={city.slug}
                href={`/porta-potty-rental/california/${city.slug}`}
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
          <h2 className="heading-lg text-white mb-6">California Porta Potty Rental Business?</h2>
          <p className="body-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our directory and connect with customers looking for porta potty rentals across California.
          </p>
          <Button
            asChild
            className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
          >
            <Link href="/porta-potty-rental/add-business">
              List Your California Business
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
