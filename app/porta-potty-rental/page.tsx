import Link from "next/link"
import { ArrowRight, Star, Users, Shield, CheckCircle, Sparkles, Award, Clock } from "lucide-react"
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
                  <span className="block text-primary-600 text-shadow-soft">PORTA POTTY</span>
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

              {/* Trust Indicators with Modern Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-3 text-gray-900">
                    <div className="p-2 bg-accent-100 rounded-xl group-hover:bg-accent-200 transition-colors duration-200">
                      <Star className="h-6 w-6 text-accent-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">10,000+</div>
                      <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                  </div>
                </div>

                <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-3 text-gray-900">
                    <div className="p-2 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors duration-200">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">500+</div>
                      <div className="text-sm text-gray-600">Verified Vendors</div>
                    </div>
                  </div>
                </div>

                <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-3 text-gray-900">
                    <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-200">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">100%</div>
                      <div className="text-sm text-gray-600">Insured Rentals</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Illustration */}
              <div className="mt-12 sm:mt-16 relative">
                <div className="relative max-w-4xl mx-auto">
                  {/* Main Hero Graphic */}
                  <div className="relative glass-effect-strong rounded-3xl p-8 sm:p-12 shadow-modern-xl">
                    {/* Porta Potty Illustration */}
                    <div className="flex items-center justify-center space-x-8">
                      {/* Standard Unit */}
                      <div className="text-center group">
                        <div className="w-20 h-24 bg-primary-500 rounded-lg shadow-modern mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-80"></div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-700 rounded"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-primary-400 rounded opacity-50"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Standard</span>
                      </div>

                      {/* Arrow */}
                      <div className="text-primary-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      {/* Luxury Unit */}
                      <div className="text-center group">
                        <div className="w-20 h-24 bg-gradient-to-b from-accent-400 to-accent-500 rounded-lg shadow-modern-lg mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
                          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-accent-700 rounded"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-10 bg-accent-300 rounded opacity-60"></div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-200 rounded opacity-80"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Luxury</span>
                      </div>

                      {/* Arrow */}
                      <div className="text-primary-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      {/* Happy Customer */}
                      <div className="text-center group">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Happy Customer</span>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-200 rounded-full opacity-60 animate-float"></div>
                    <div
                      className="absolute -top-2 -right-6 w-6 h-6 bg-accent-200 rounded-full opacity-60 animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute -bottom-3 left-8 w-4 h-4 bg-green-200 rounded-full opacity-60 animate-float"
                      style={{ animationDelay: "2s" }}
                    ></div>
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
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 glass-effect text-green-700 rounded-full text-sm font-semibold">
                    <Award className="h-4 w-4 mr-2" />
                    Why Choose Us
                  </div>
                  <h2 className="heading-lg text-gray-900 text-shadow-soft">
                    Why Choose Our Porta Potty Rental Directory?
                  </h2>
                  <p className="body-md text-gray-700 text-shadow-soft">
                    We connect you with the most reliable porta potty rental companies in your area, ensuring you get
                    the best service for your portable restroom needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-green-100 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Verified Porta Potty Rental Companies</h3>
                      <p className="text-gray-700">
                        All porta potty rental vendors are thoroughly vetted and insured for your complete peace of
                        mind.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-primary-100 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Best Porta Potty Rental Prices</h3>
                      <p className="text-gray-700">
                        Compare competitive pricing from multiple porta potty rental companies in your area.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-accent-100 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Quality Porta Potty Rental Service</h3>
                      <p className="text-gray-700">
                        We maintain high standards to ensure you get clean, reliable portable restrooms every time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glass-effect-strong rounded-2xl p-8 sm:p-10">
                  <div className="grid grid-cols-2 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">500+</div>
                      <div className="text-sm sm:text-base text-gray-600">Porta Potty Companies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-accent-600 mb-2">10K+</div>
                      <div className="text-sm sm:text-base text-gray-600">Satisfied Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">50</div>
                      <div className="text-sm sm:text-base text-gray-600">States Covered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">4.8★</div>
                      <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <div className="inline-flex items-center px-4 py-2 glass-effect text-blue-700 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4 mr-2" />
                Perfect For Every Event
              </div>
              <h2 className="heading-lg text-gray-900 text-shadow-soft">Porta Potty Rentals for Every Occasion</h2>
              <p className="body-md text-gray-700 max-w-3xl mx-auto text-shadow-soft">
                From intimate gatherings to large-scale events, we have the perfect portable restroom solution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Wedding Events */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-300 rounded-full opacity-60"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Weddings</h3>
                <p className="text-gray-700 text-sm">Elegant luxury units for your special day</p>
              </div>

              {/* Construction Sites */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full opacity-60"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction</h3>
                <p className="text-gray-700 text-sm">Durable units for job sites and projects</p>
              </div>

              {/* Festivals & Events */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-300 rounded-full opacity-60"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Festivals</h3>
                <p className="text-gray-700 text-sm">High-capacity solutions for large crowds</p>
              </div>

              {/* Private Parties */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-300 rounded-full opacity-60"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Private Parties</h3>
                <p className="text-gray-700 text-sm">Clean, convenient units for backyard events</p>
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
