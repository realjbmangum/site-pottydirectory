import Link from "next/link"
import { ArrowRight, Sparkles, Clock, Truck, FileText, Search, Heart, Hammer, Music, PartyPopper } from "lucide-react"
import SearchBar from "@/components/search-bar"
import VendorCard from "@/components/vendor-card"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import PortaPottyLogo from "@/components/porta-potty-logo"
import PageBackground from "@/components/page-background"

export const metadata: Metadata = {
  title: "Best Porta Potty Rental Directory - Find Local Portable Restroom Rentals",
  description:
    "Find the best porta potty rental companies near you. Compare prices, features, and book reliable portable restroom rentals for events, construction sites, and outdoor gatherings. Trusted porta potty rental directory with verified vendors.",
  keywords: [
    "porta potty rental",
    "porta potty rental near me",
    "portable restroom rental",
    "porta potty rental companies",
    "event porta potty rental",
    "construction porta potty rental",
    "luxury porta potty rental",
  ],
  openGraph: {
    title: "Best Porta Potty Rental Directory - Find Local Portable Restroom Rentals",
    description:
      "Find the best porta potty rental companies near you. Compare prices and book reliable portable restroom rentals.",
    url: "https://portapottypro.com/porta-potty-rental",
  },
}

// Mock data for featured vendors with SEO-optimized slugs
const featuredVendors = [
  {
    id: "1",
    name: "Miami Porta Potty Rental",
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
    id: "2",
    name: "Austin Porta Potty Rental",
    city: "Austin",
    state: "TX",
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
    id: "3",
    name: "Denver Porta Potty Rental",
    city: "Denver",
    state: "CO",
    features: {
      urinal: true,
      handWashing: false,
      sanitizer: true,
      lockingDoor: true,
      mirror: true,
    },
    type: "Standard" as const,
    dailyRate: 3 as const,
    slug: "denver-construction-porta-potty-rental-co",
  },
]

export default function HomePage() {
  return (
    <PageBackground variant="hero">
      <div className="min-h-screen">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Porta Potty Icons */}
            <div className="absolute top-20 left-10 opacity-20 animate-particles">
              <PortaPottyLogo size="xl" className="text-primary-300" />
            </div>
            <div className="absolute top-40 right-20 opacity-20 animate-particles" style={{ animationDelay: "2s" }}>
              <PortaPottyLogo size="lg" className="text-accent-300" />
            </div>
            <div className="absolute bottom-20 left-20 opacity-20 animate-particles" style={{ animationDelay: "4s" }}>
              <PortaPottyLogo size="md" className="text-primary-200" />
            </div>
            <div className="absolute bottom-40 right-10 opacity-20 animate-particles" style={{ animationDelay: "6s" }}>
              <PortaPottyLogo size="lg" className="text-accent-200" />
            </div>

            {/* Geometric Shapes */}
            <div className="absolute top-32 right-1/4 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-30 blur-xl animate-float"></div>
            <div
              className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full opacity-30 blur-xl animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
            <div className="text-center space-y-8 sm:space-y-12">
              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="heading-hero text-gray-900">
                  <span className="block text-shadow-soft">Find A</span>
                  <span className="block text-primary-600 text-shadow-soft">PORTA POTTY RENTAL</span>
                  <span className="block text-shadow-soft">Near You</span>
                </h1>

                <div className="max-w-4xl mx-auto">
                  <p className="body-lg text-gray-700 font-medium text-shadow-soft">
                    Compare prices, features, and book reliable porta potty rental services for your events,
                    construction sites, and outdoor gatherings. Trusted portable restroom rental directory with verified
                    vendors nationwide.
                  </p>
                </div>
              </div>

              {/* Modern Search Bar */}
              <div className="flex justify-center px-4">
                <SearchBar placeholder="Enter your city or state for porta potty rental..." />
              </div>

              {/* Why People Use PottyDirectory */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-shadow-soft">Why People Use PottyDirectory</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                  <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center justify-center space-x-3 text-gray-900">
                      <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-200">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">1,000+</div>
                        <div className="text-sm text-gray-600">Porta Potty Rentals Tracked</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Nationwide vendor data to compare rates, features & availability.
                    </p>
                  </div>

                  <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center justify-center space-x-3 text-gray-900">
                      <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-200">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Verified</div>
                        <div className="text-sm text-gray-600">Vendors by State</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Browse trusted local providers with real contact info.
                    </p>
                  </div>

                  <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center justify-center space-x-3 text-gray-900">
                      <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-200">
                        <Search className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Filter</div>
                        <div className="text-sm text-gray-600">by Features</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Search for handwashing stations, climate control, locks, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Porta Potty Rental Companies */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <div className="inline-flex items-center px-4 py-2 glass-effect text-primary-700 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4 mr-2" />
                Featured Companies
              </div>
              <h2 className="heading-lg text-gray-900 text-shadow-soft">Top-Rated Porta Potty Rental Companies</h2>
              <p className="body-md text-gray-700 max-w-3xl mx-auto text-shadow-soft">
                Discover trusted porta potty rental companies in popular locations. Compare features, prices, and book
                your portable restroom rental today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-4 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Link href="/porta-potty-rental/states">
                  Browse All States for Porta Potty Rental
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <div className="inline-flex items-center px-4 py-2 glass-effect text-accent-700 rounded-full text-sm font-semibold">
                <Clock className="h-4 w-4 mr-2" />
                Simple Process
              </div>
              <h2 className="heading-lg text-gray-900 text-shadow-soft">How Porta Potty Rental Works</h2>
              <p className="body-md text-gray-700 max-w-3xl mx-auto text-shadow-soft">
                Find and book porta potty rental services in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center group">
                <div className="glass-effect-strong rounded-2xl p-8 sm:p-10 hover:scale-105 transition-all duration-300">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 text-white rounded-2xl font-bold text-2xl mb-6 shadow-modern-lg group-hover:shadow-modern-xl transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" }}
                  >
                    1
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-4">Search Your Area</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Enter your city or state to find available porta potty rental companies near you with competitive
                    pricing and verified reviews.
                  </p>
                </div>
              </div>

              <div className="text-center group">
                <div className="glass-effect-strong rounded-2xl p-8 sm:p-10 hover:scale-105 transition-all duration-300">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 text-gray-900 rounded-2xl font-bold text-2xl mb-6 shadow-modern-lg group-hover:shadow-modern-xl transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #facc15 0%, #eab308 100%)" }}
                  >
                    2
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-4">Compare Options</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Review features, prices, and ratings to find the perfect porta potty rental for your specific needs
                    and budget requirements.
                  </p>
                </div>
              </div>

              <div className="text-center group">
                <div className="glass-effect-strong rounded-2xl p-8 sm:p-10 hover:scale-105 transition-all duration-300">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 text-white rounded-2xl font-bold text-2xl mb-6 shadow-modern-lg group-hover:shadow-modern-xl transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                  >
                    3
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-4">Book & Enjoy</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Contact your chosen porta potty rental company directly to book and arrange delivery for your event
                    or project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        {/* Services Showcase */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <div className="inline-flex items-center px-4 py-2 glass-effect text-blue-700 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4 mr-2" />
                Perfect For Every Event
              </div>
              <h2 className="heading-lg text-gray-900">Porta Potty Rentals for Every Occasion</h2>
              <p className="body-md text-gray-700 max-w-3xl mx-auto">
                From intimate gatherings to large-scale events, we have the perfect portable restroom solution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Weddings */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <Heart className="w-10 h-10 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weddings</h3>
                <p className="text-gray-700 text-sm">Luxury restroom trailers for your special day</p>
              </div>

              {/* Construction Sites */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <Hammer className="w-10 h-10 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction Sites</h3>
                <p className="text-gray-700 text-sm">Rugged, job-ready porta potties built for crews</p>
              </div>

              {/* Festivals */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <Music className="w-10 h-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Festivals</h3>
                <p className="text-gray-700 text-sm">High-volume rentals for large public events</p>
              </div>

              {/* Backyard Parties */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <PartyPopper className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Backyard Parties</h3>
                <p className="text-gray-700 text-sm">Clean, private units for family gatherings</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="heading-lg text-white">Ready to List Your Porta Potty Rental Business?</h2>
              <p className="body-lg text-blue-100 max-w-3xl mx-auto">
                Join hundreds of porta potty rental companies already growing their business with our directory. Get
                more customers and increase your porta potty rental bookings.
              </p>
            </div>
            <Button
              asChild
              className="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-xl font-semibold shadow-modern-lg hover:shadow-modern-xl hover:scale-105 transition-all duration-200"
            >
              <Link href="/porta-potty-rental/add-business">
                List Your Porta Potty Rental Business
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageBackground>
  )
}
