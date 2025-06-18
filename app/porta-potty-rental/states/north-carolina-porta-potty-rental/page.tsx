import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import VendorCard from "@/components/vendor-card"
import SearchBar from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "North Carolina Porta Potty Rental - Best Portable Restroom Companies in NC",
  description:
    "Find reliable porta potty rental companies in North Carolina. Compare prices, features, and book portable restroom rentals for events, construction sites, and outdoor gatherings across NC.",
  keywords: [
    "north carolina porta potty rental",
    "portable restroom rental north carolina",
    "porta potty rental NC",
    "north carolina portable toilet rental",
    "event porta potty rental north carolina",
    "construction porta potty rental north carolina",
  ],
  openGraph: {
    title: "North Carolina Porta Potty Rental - Best Portable Restroom Companies in NC",
    description:
      "Find reliable porta potty rental companies in North Carolina. Compare prices and book portable restroom rentals across NC.",
    url: "https://portapottypro.com/porta-potty-rental/states/north-carolina-porta-potty-rental",
  },
}

// Mock vendor data for North Carolina
const northCarolinaVendors = [
  {
    id: "nc-1",
    name: "Charlotte Premium Porta Potty Services",
    city: "Charlotte",
    state: "NC",
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
    id: "nc-2",
    name: "Raleigh Event Portable Restrooms",
    city: "Raleigh",
    state: "NC",
    features: {
      urinal: false,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: false,
    },
    type: "Standard" as const,
    dailyRate: 2 as const,
    slug: "raleigh-event-portable-restrooms-nc",
  },
]

// Mock cities data for North Carolina
const northCarolinaCities = [
  { name: "Charlotte", vendorCount: 18, slug: "charlotte-porta-potty-rental" },
  { name: "Raleigh", vendorCount: 15, slug: "raleigh-porta-potty-rental" },
  { name: "Greensboro", vendorCount: 12, slug: "greensboro-porta-potty-rental" },
  { name: "Durham", vendorCount: 10, slug: "durham-porta-potty-rental" },
  { name: "Winston-Salem", vendorCount: 8, slug: "winston-salem-porta-potty-rental" },
  { name: "Fayetteville", vendorCount: 7, slug: "fayetteville-porta-potty-rental" },
  { name: "Cary", vendorCount: 6, slug: "cary-porta-potty-rental" },
  { name: "Wilmington", vendorCount: 5, slug: "wilmington-porta-potty-rental" },
]

export default function NorthCarolinaPortaPottyRentalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        {/* North Carolina Flag Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://flagcdn.com/w320/us-nc.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="heading-xl text-gray-900">North Carolina Porta Potty Rental</h1>
              <p className="body-lg text-gray-600 max-w-3xl mx-auto">
                Find reliable porta potty rental companies across North Carolina. Compare prices, features, and book
                portable restroom rentals for your events, construction sites, and outdoor gatherings in the Tar Heel
                State.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center">
              <SearchBar placeholder="Search North Carolina cities for porta potty rental..." />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">84</div>
                <div className="text-sm text-gray-600">Verified Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">35+</div>
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
            <h2 className="heading-lg text-gray-900 mb-4">Featured North Carolina Porta Potty Rental Companies</h2>
            <p className="body-md text-gray-600 max-w-3xl mx-auto">
              Top-rated portable restroom rental companies serving North Carolina with excellent customer reviews and
              competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {northCarolinaVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200">
              View All North Carolina Porta Potty Rental Companies
            </Button>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Porta Potty Rental by North Carolina City</h2>
            <p className="body-md text-gray-600 max-w-3xl mx-auto">
              Browse porta potty rental companies by city across North Carolina. Find local portable restroom services
              in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {northCarolinaCities.map((city) => (
              <Link
                key={city.slug}
                href={`/porta-potty-rental/north-carolina/${city.slug}`}
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
          <h2 className="heading-lg text-white mb-6">North Carolina Porta Potty Rental Business?</h2>
          <p className="body-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our directory and connect with customers looking for porta potty rentals across North Carolina.
          </p>
          <Button
            asChild
            className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
          >
            <Link href="/porta-potty-rental/add-business">
              List Your North Carolina Business
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
