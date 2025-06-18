import Link from "next/link"
import { ArrowRight, Star, Users, Shield, CheckCircle } from "lucide-react"
import SearchBar from "@/components/search-bar"
import VendorCard from "@/components/vendor-card"
import VideoBackground from "@/components/video-background"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

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
    id: "2",
    name: "Austin Event Porta Potty Rental",
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
    name: "Denver Construction Porta Potty Rental",
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
    <div className="min-h-screen">
      {/* Hero Section with Video Background - Mobile First */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Video Background with Parallax */}
        <VideoBackground
          videoUrl="/videos/waterfall-background.mp4"
          parallax={true}
          overlay={true}
          className="scale-110"
        />

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40 z-5"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <h1 className="heading-xl text-white mb-4 sm:mb-6">
              <span className="block text-white drop-shadow-2xl">Find A</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl stroke-white stroke-2 paint-order-stroke">
                PORTA POTTY
              </span>
              <span className="block text-white drop-shadow-2xl">Near You</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              Compare prices, features, and book reliable porta potty rental services for your events, construction
              sites, and outdoor gatherings. Trusted portable restroom rental directory with verified vendors
              nationwide.
            </p>

            {/* Search Bar - Mobile Optimized with Glass Effect */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="w-full max-w-2xl">
                <div className="glass-effect-dark rounded-2xl p-2 shadow-modern-lg backdrop-blur-md border border-white/30">
                  <SearchBar placeholder="Enter your city or state for porta potty rental..." />
                </div>
              </div>
            </div>

            {/* Trust Indicators - Mobile Responsive with Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="glass-effect-dark rounded-xl p-4 shadow-modern backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold">10,000+ Happy Customers</span>
                </div>
              </div>
              <div className="glass-effect-dark rounded-xl p-4 shadow-modern backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Users className="h-5 w-5 text-blue-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold">500+ Verified Vendors</span>
                </div>
              </div>
              <div className="glass-effect-dark rounded-xl p-4 shadow-modern backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold">Fully Insured Rentals</span>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Porta Potty Rental Companies */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="heading-lg text-secondary-900 mb-4">Featured Porta Potty Rental Companies</h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto">
              Top-rated porta potty rental companies in popular locations. Compare features, prices, and book your
              portable restroom rental today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="gradient-primary hover:shadow-modern-lg transition-all duration-300">
              <Link href="/porta-potty-rental/states">
                Browse All States for Porta Potty Rental
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How Porta Potty Rental Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="heading-lg text-secondary-900 mb-4">How Porta Potty Rental Works</h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto">
              Find and book porta potty rental services in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-modern">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="heading-sm text-secondary-900 mb-3">Search Your Area</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Enter your city or state to find available porta potty rental companies near you with competitive
                  pricing.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-modern">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="heading-sm text-secondary-900 mb-3">Compare Porta Potty Rental Options</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Review features, prices, and ratings to find the perfect porta potty rental for your specific needs.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-modern">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="heading-sm text-secondary-900 mb-3">Book & Enjoy</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Contact your chosen porta potty rental company directly to book and arrange delivery for your event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Porta Potty Rental Directory */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="heading-lg text-secondary-900 mb-6">Why Choose Our Porta Potty Rental Directory?</h2>
              <p className="text-base sm:text-lg text-secondary-600 mb-6 sm:mb-8 leading-relaxed">
                We connect you with the most reliable porta potty rental companies in your area, ensuring you get the
                best service for your portable restroom needs.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Verified Porta Potty Rental Companies</h3>
                    <p className="text-secondary-600">
                      All porta potty rental vendors are thoroughly vetted and insured for your peace of mind.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Best Porta Potty Rental Prices</h3>
                    <p className="text-secondary-600">
                      Compare competitive pricing from multiple porta potty rental companies in your area.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-success-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Quality Porta Potty Rental Service</h3>
                    <p className="text-secondary-600">
                      We maintain high standards to ensure you get clean, reliable portable restrooms every time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-modern-lg">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">500+</div>
                    <div className="text-sm sm:text-base text-secondary-600">Porta Potty Rental Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">10K+</div>
                    <div className="text-sm sm:text-base text-secondary-600">Satisfied Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">50</div>
                    <div className="text-sm sm:text-base text-secondary-600">States Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">4.8★</div>
                    <div className="text-sm sm:text-base text-secondary-600">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for Porta Potty Rental Business */}
      <section className="py-12 sm:py-16 lg:py-20 gradient-primary relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-lg text-white mb-4 sm:mb-6">Ready to List Your Porta Potty Rental Business?</h2>
          <p className="text-lg sm:text-xl text-primary-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of porta potty rental companies already growing their business with our directory. Get more
            customers and increase your porta potty rental bookings.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary-600 hover:bg-primary-50 shadow-modern hover:shadow-modern-lg transition-all duration-300"
          >
            <Link href="/porta-potty-rental/add-business">
              List Your Porta Potty Rental Business
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
