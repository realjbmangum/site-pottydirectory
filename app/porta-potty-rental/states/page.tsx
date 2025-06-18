import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Porta Potty Rental by State - Find Local Portable Restroom Rentals",
  description:
    "Browse porta potty rental companies by state. Find reliable portable restroom rental services in your state with competitive pricing and verified vendors.",
  keywords: [
    "porta potty rental by state",
    "state porta potty rental directory",
    "portable restroom rental by state",
    "local porta potty rental companies",
    "state portable toilet rental",
  ],
  openGraph: {
    title: "Porta Potty Rental by State - Find Local Portable Restroom Rentals",
    description:
      "Browse porta potty rental companies by state. Find reliable portable restroom rental services in your state.",
    url: "https://portapottypro.com/porta-potty-rental/states",
  },
}

// Mock data for states with SEO-optimized slugs
const states = [
  { name: "Alabama", code: "AL", vendorCount: 45, slug: "alabama-porta-potty-rental" },
  { name: "Alaska", code: "AK", vendorCount: 12, slug: "alaska-porta-potty-rental" },
  { name: "Arizona", code: "AZ", vendorCount: 67, slug: "arizona-porta-potty-rental" },
  { name: "Arkansas", code: "AR", vendorCount: 34, slug: "arkansas-porta-potty-rental" },
  { name: "California", code: "CA", vendorCount: 156, slug: "california-porta-potty-rental" },
  { name: "Colorado", code: "CO", vendorCount: 78, slug: "colorado-porta-potty-rental" },
  { name: "Connecticut", code: "CT", vendorCount: 23, slug: "connecticut-porta-potty-rental" },
  { name: "Delaware", code: "DE", vendorCount: 15, slug: "delaware-porta-potty-rental" },
  { name: "Florida", code: "FL", vendorCount: 134, slug: "florida-porta-potty-rental" },
  { name: "Georgia", code: "GA", vendorCount: 89, slug: "georgia-porta-potty-rental" },
  { name: "Hawaii", code: "HI", vendorCount: 18, slug: "hawaii-porta-potty-rental" },
  { name: "Idaho", code: "ID", vendorCount: 29, slug: "idaho-porta-potty-rental" },
  { name: "Illinois", code: "IL", vendorCount: 98, slug: "illinois-porta-potty-rental" },
  { name: "Indiana", code: "IN", vendorCount: 56, slug: "indiana-porta-potty-rental" },
  { name: "Iowa", code: "IA", vendorCount: 41, slug: "iowa-porta-potty-rental" },
  { name: "Kansas", code: "KS", vendorCount: 38, slug: "kansas-porta-potty-rental" },
  { name: "Kentucky", code: "KY", vendorCount: 47, slug: "kentucky-porta-potty-rental" },
  { name: "Louisiana", code: "LA", vendorCount: 52, slug: "louisiana-porta-potty-rental" },
  { name: "Maine", code: "ME", vendorCount: 21, slug: "maine-porta-potty-rental" },
  { name: "Maryland", code: "MD", vendorCount: 43, slug: "maryland-porta-potty-rental" },
  { name: "Massachusetts", code: "MA", vendorCount: 54, slug: "massachusetts-porta-potty-rental" },
  { name: "Michigan", code: "MI", vendorCount: 72, slug: "michigan-porta-potty-rental" },
  { name: "Minnesota", code: "MN", vendorCount: 61, slug: "minnesota-porta-potty-rental" },
  { name: "Mississippi", code: "MS", vendorCount: 33, slug: "mississippi-porta-potty-rental" },
  { name: "Missouri", code: "MO", vendorCount: 58, slug: "missouri-porta-potty-rental" },
  { name: "Montana", code: "MT", vendorCount: 26, slug: "montana-porta-potty-rental" },
  { name: "Nebraska", code: "NE", vendorCount: 31, slug: "nebraska-porta-potty-rental" },
  { name: "Nevada", code: "NV", vendorCount: 39, slug: "nevada-porta-potty-rental" },
  { name: "New Hampshire", code: "NH", vendorCount: 19, slug: "new-hampshire-porta-potty-rental" },
  { name: "New Jersey", code: "NJ", vendorCount: 67, slug: "new-jersey-porta-potty-rental" },
  { name: "New Mexico", code: "NM", vendorCount: 28, slug: "new-mexico-porta-potty-rental" },
  { name: "New York", code: "NY", vendorCount: 123, slug: "new-york-porta-potty-rental" },
  { name: "North Carolina", code: "NC", vendorCount: 84, slug: "north-carolina-porta-potty-rental" },
  { name: "North Dakota", code: "ND", vendorCount: 17, slug: "north-dakota-porta-potty-rental" },
  { name: "Ohio", code: "OH", vendorCount: 91, slug: "ohio-porta-potty-rental" },
  { name: "Oklahoma", code: "OK", vendorCount: 44, slug: "oklahoma-porta-potty-rental" },
  { name: "Oregon", code: "OR", vendorCount: 53, slug: "oregon-porta-potty-rental" },
  { name: "Pennsylvania", code: "PA", vendorCount: 87, slug: "pennsylvania-porta-potty-rental" },
  { name: "Rhode Island", code: "RI", vendorCount: 14, slug: "rhode-island-porta-potty-rental" },
  { name: "South Carolina", code: "SC", vendorCount: 49, slug: "south-carolina-porta-potty-rental" },
  { name: "South Dakota", code: "SD", vendorCount: 22, slug: "south-dakota-porta-potty-rental" },
  { name: "Tennessee", code: "TN", vendorCount: 63, slug: "tennessee-porta-potty-rental" },
  { name: "Texas", code: "TX", vendorCount: 187, slug: "texas-porta-potty-rental" },
  { name: "Utah", code: "UT", vendorCount: 35, slug: "utah-porta-potty-rental" },
  { name: "Vermont", code: "VT", vendorCount: 16, slug: "vermont-porta-potty-rental" },
  { name: "Virginia", code: "VA", vendorCount: 76, slug: "virginia-porta-potty-rental" },
  { name: "Washington", code: "WA", vendorCount: 69, slug: "washington-porta-potty-rental" },
  { name: "West Virginia", code: "WV", vendorCount: 25, slug: "west-virginia-porta-potty-rental" },
  { name: "Wisconsin", code: "WI", vendorCount: 55, slug: "wisconsin-porta-potty-rental" },
  { name: "Wyoming", code: "WY", vendorCount: 18, slug: "wyoming-porta-potty-rental" },
]

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="heading-lg text-secondary-900 mb-4 sm:mb-6">Porta Potty Rental by State</h1>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Find reliable porta potty rental companies in your state. Browse our directory of verified portable restroom
            rental services with competitive pricing and excellent customer reviews.
          </p>
        </div>

        {/* States Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {states.map((state) => (
            <Link
              key={state.code}
              href={`/porta-potty-rental/states/${state.slug}`}
              className="glass-effect rounded-xl shadow-modern hover:shadow-modern-hover transition-all duration-300 p-4 sm:p-6 group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                  {state.name}
                </h3>
                <div className="gradient-primary p-2 rounded-lg shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
              </div>

              <p className="text-sm text-secondary-600 mb-3">
                {state.vendorCount} porta potty rental compan{state.vendorCount !== 1 ? "ies" : "y"} available
              </p>

              <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors duration-200">
                <span>View {state.name} Porta Potty Rental</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-modern max-w-2xl mx-auto">
            <h2 className="heading-sm text-secondary-900 mb-4">Can't Find Your State?</h2>
            <p className="text-secondary-600 mb-6">
              We're constantly adding new porta potty rental companies to our directory. Contact us to add your state or
              business.
            </p>
            <Link
              href="/porta-potty-rental/contact"
              className="inline-flex items-center px-6 py-3 gradient-primary text-white font-semibold rounded-lg shadow-modern hover:shadow-modern-lg transition-all duration-300"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
