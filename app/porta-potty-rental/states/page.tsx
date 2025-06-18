import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import PageBackground from "@/components/page-background"

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

// Mock data for states with SEO-optimized slugs and flag images
const states = [
  {
    name: "Alabama",
    code: "AL",
    vendorCount: 45,
    slug: "alabama-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-al.png",
  },
  {
    name: "Alaska",
    code: "AK",
    vendorCount: 12,
    slug: "alaska-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ak.png",
  },
  {
    name: "Arizona",
    code: "AZ",
    vendorCount: 67,
    slug: "arizona-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-az.png",
  },
  {
    name: "Arkansas",
    code: "AR",
    vendorCount: 34,
    slug: "arkansas-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ar.png",
  },
  {
    name: "California",
    code: "CA",
    vendorCount: 156,
    slug: "california-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ca.png",
  },
  {
    name: "Colorado",
    code: "CO",
    vendorCount: 78,
    slug: "colorado-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-co.png",
  },
  {
    name: "Connecticut",
    code: "CT",
    vendorCount: 23,
    slug: "connecticut-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ct.png",
  },
  {
    name: "Delaware",
    code: "DE",
    vendorCount: 15,
    slug: "delaware-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-de.png",
  },
  {
    name: "Florida",
    code: "FL",
    vendorCount: 134,
    slug: "florida-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-fl.png",
  },
  {
    name: "Georgia",
    code: "GA",
    vendorCount: 89,
    slug: "georgia-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ga.png",
  },
  {
    name: "Hawaii",
    code: "HI",
    vendorCount: 18,
    slug: "hawaii-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-hi.png",
  },
  {
    name: "Idaho",
    code: "ID",
    vendorCount: 29,
    slug: "idaho-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-id.png",
  },
  {
    name: "Illinois",
    code: "IL",
    vendorCount: 98,
    slug: "illinois-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-il.png",
  },
  {
    name: "Indiana",
    code: "IN",
    vendorCount: 56,
    slug: "indiana-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-in.png",
  },
  {
    name: "Iowa",
    code: "IA",
    vendorCount: 41,
    slug: "iowa-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ia.png",
  },
  {
    name: "Kansas",
    code: "KS",
    vendorCount: 38,
    slug: "kansas-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ks.png",
  },
  {
    name: "Kentucky",
    code: "KY",
    vendorCount: 47,
    slug: "kentucky-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ky.png",
  },
  {
    name: "Louisiana",
    code: "LA",
    vendorCount: 52,
    slug: "louisiana-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-la.png",
  },
  {
    name: "Maine",
    code: "ME",
    vendorCount: 21,
    slug: "maine-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-me.png",
  },
  {
    name: "Maryland",
    code: "MD",
    vendorCount: 43,
    slug: "maryland-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-md.png",
  },
  {
    name: "Massachusetts",
    code: "MA",
    vendorCount: 54,
    slug: "massachusetts-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ma.png",
  },
  {
    name: "Michigan",
    code: "MI",
    vendorCount: 72,
    slug: "michigan-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-mi.png",
  },
  {
    name: "Minnesota",
    code: "MN",
    vendorCount: 61,
    slug: "minnesota-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-mn.png",
  },
  {
    name: "Mississippi",
    code: "MS",
    vendorCount: 33,
    slug: "mississippi-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ms.png",
  },
  {
    name: "Missouri",
    code: "MO",
    vendorCount: 58,
    slug: "missouri-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-mo.png",
  },
  {
    name: "Montana",
    code: "MT",
    vendorCount: 26,
    slug: "montana-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-mt.png",
  },
  {
    name: "Nebraska",
    code: "NE",
    vendorCount: 31,
    slug: "nebraska-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ne.png",
  },
  {
    name: "Nevada",
    code: "NV",
    vendorCount: 39,
    slug: "nevada-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-nv.png",
  },
  {
    name: "New Hampshire",
    code: "NH",
    vendorCount: 19,
    slug: "new-hampshire-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-nh.png",
  },
  {
    name: "New Jersey",
    code: "NJ",
    vendorCount: 67,
    slug: "new-jersey-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-nj.png",
  },
  {
    name: "New Mexico",
    code: "NM",
    vendorCount: 28,
    slug: "new-mexico-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-nm.png",
  },
  {
    name: "New York",
    code: "NY",
    vendorCount: 123,
    slug: "new-york-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ny.png",
  },
  {
    name: "North Carolina",
    code: "NC",
    vendorCount: 84,
    slug: "north-carolina-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-nc.png",
  },
  {
    name: "North Dakota",
    code: "ND",
    vendorCount: 17,
    slug: "north-dakota-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-nd.png",
  },
  {
    name: "Ohio",
    code: "OH",
    vendorCount: 91,
    slug: "ohio-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-oh.png",
  },
  {
    name: "Oklahoma",
    code: "OK",
    vendorCount: 44,
    slug: "oklahoma-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ok.png",
  },
  {
    name: "Oregon",
    code: "OR",
    vendorCount: 53,
    slug: "oregon-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-or.png",
  },
  {
    name: "Pennsylvania",
    code: "PA",
    vendorCount: 87,
    slug: "pennsylvania-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-pa.png",
  },
  {
    name: "Rhode Island",
    code: "RI",
    vendorCount: 14,
    slug: "rhode-island-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ri.png",
  },
  {
    name: "South Carolina",
    code: "SC",
    vendorCount: 49,
    slug: "south-carolina-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-sc.png",
  },
  {
    name: "South Dakota",
    code: "SD",
    vendorCount: 22,
    slug: "south-dakota-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-sd.png",
  },
  {
    name: "Tennessee",
    code: "TN",
    vendorCount: 63,
    slug: "tennessee-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-tn.png",
  },
  {
    name: "Texas",
    code: "TX",
    vendorCount: 187,
    slug: "texas-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-tx.png",
  },
  {
    name: "Utah",
    code: "UT",
    vendorCount: 35,
    slug: "utah-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-ut.png",
  },
  {
    name: "Vermont",
    code: "VT",
    vendorCount: 16,
    slug: "vermont-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-vt.png",
  },
  {
    name: "Virginia",
    code: "VA",
    vendorCount: 76,
    slug: "virginia-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-va.png",
  },
  {
    name: "Washington",
    code: "WA",
    vendorCount: 69,
    slug: "washington-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-wa.png",
  },
  {
    name: "West Virginia",
    code: "WV",
    vendorCount: 25,
    slug: "west-virginia-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-wv.png",
  },
  {
    name: "Wisconsin",
    code: "WI",
    vendorCount: 55,
    slug: "wisconsin-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-wi.png",
  },
  {
    name: "Wyoming",
    code: "WY",
    vendorCount: 18,
    slug: "wyoming-porta-potty-rental",
    flagUrl: "https://flagcdn.com/w320/us-wy.png",
  },
]

export default function StatesPage() {
  return (
    <PageBackground variant="default">
      <div className="min-h-screen">
        {/* Content */}
        <div className="relative z-10 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="heading-lg text-secondary-900 mb-4 sm:mb-6 text-shadow-soft">
                Porta Potty Rental by State
              </h1>
              <p className="text-base sm:text-lg text-secondary-700 max-w-3xl mx-auto leading-relaxed font-medium text-shadow-soft">
                Find reliable porta potty rental companies in your state. Browse our directory of verified portable
                restroom rental services with competitive pricing and excellent customer reviews.
              </p>
            </div>

            {/* States Grid - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {states.map((state) => (
                <Link
                  key={state.code}
                  href={`/porta-potty-rental/states/${state.slug}`}
                  className="glass-effect-strong rounded-xl shadow-modern hover:shadow-modern-hover transition-all duration-300 p-4 sm:p-6 group relative overflow-hidden backdrop-blur-sm"
                >
                  {/* Flag Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${state.flagUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  {/* Enhanced Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-white/55 group-hover:from-white/75 group-hover:via-white/60 group-hover:to-white/45 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 text-shadow-soft">
                        {state.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-center mb-3">
                      <div className="gradient-primary p-2 rounded-lg shadow-modern group-hover:shadow-modern-lg transition-all duration-300">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <p className="text-sm text-secondary-800 mb-3 font-semibold">
                      {state.vendorCount} porta potty rental compan{state.vendorCount !== 1 ? "ies" : "y"} available
                    </p>

                    <div className="flex items-center justify-center text-primary-600 text-sm font-bold group-hover:text-primary-700 transition-colors duration-200">
                      <span>View {state.name} Porta Potty Rental</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12 sm:mt-16">
              <div className="glass-effect-strong rounded-2xl p-6 sm:p-8 shadow-modern-lg max-w-2xl mx-auto backdrop-blur-md">
                <h2 className="heading-sm text-secondary-900 mb-4 text-shadow-soft">Can't Find Your State?</h2>
                <p className="text-secondary-700 mb-6 font-medium">
                  We're constantly adding new porta potty rental companies to our directory. Contact us to add your
                  state or business.
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
      </div>
    </PageBackground>
  )
}
