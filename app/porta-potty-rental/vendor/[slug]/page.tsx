import { MapPin, Phone, Mail, Globe, Star, Check, X, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock vendor data - in a real app, this would come from your database
const getVendorData = (slug: string) => {
  // Charlotte vendor data
  if (slug === "charlotte-premium-porta-potty-services-nc") {
    return {
      id: "nc-1",
      name: "Charlotte Premium Porta Potty Services",
      city: "Charlotte",
      state: "NC",
      address: "2150 South Blvd, Charlotte, NC 28203",
      phone: "(704) 555-0199",
      email: "info@charlotteportapotty.com",
      website: "https://charlotteportapotty.com",
      description:
        "Premier porta potty rental service in Charlotte and surrounding areas. We specialize in luxury portable restrooms for weddings, corporate events, birthday parties, and construction sites. Family-owned business with over 12 years of experience serving the greater Charlotte metropolitan area.",
      features: {
        urinal: true,
        handWashing: true,
        sanitizer: true,
        lockingDoor: true,
        mirror: true,
      },
      type: "Luxury" as const,
      dailyRate: 3 as const,
      rating: 4.9,
      reviewCount: 89,
      yearsInBusiness: 12,
      serviceAreas: ["Charlotte", "Concord", "Gastonia", "Rock Hill", "Matthews", "Huntersville"],
      images: [
        "/images/wedding-porta-potty-setup.jpg",
        "/images/birthday-party-porta-potty.jpg",
        "/images/construction-site-porta-potty.jpg",
      ],
      imageDescriptions: [
        "Luxury porta potty setup at outdoor wedding venue",
        "Colorful porta potty rental at kids birthday party",
        "Standard porta potty units at construction site",
      ],
      reviews: [
        {
          id: 1,
          name: "Jennifer Martinez",
          rating: 5,
          date: "2024-01-20",
          comment:
            "Outstanding service for our wedding! The luxury units were spotless and perfectly positioned. The staff was incredibly professional and the units blended beautifully with our outdoor venue. Highly recommend for any special event.",
        },
        {
          id: 2,
          name: "Robert Thompson",
          rating: 5,
          date: "2024-01-15",
          comment:
            "Used them for our construction site for 6 months. Reliable delivery, clean units, and great customer service. They handled all the maintenance and never missed a scheduled service. Will definitely use again.",
        },
        {
          id: 3,
          name: "Sarah Wilson",
          rating: 5,
          date: "2024-01-08",
          comment:
            "Perfect for my daughter's 8th birthday party! They provided a fun, colorful unit that the kids loved. Clean, safe, and the delivery team was so friendly. Made our backyard party stress-free!",
        },
      ],
    }
  }

  // Default Miami vendor data (keep existing)
  return {
    id: "1",
    name: "Miami Portable Restrooms",
    city: "Miami",
    state: "FL",
    address: "123 Business Blvd, Miami, FL 33101",
    phone: "(305) 555-0123",
    email: "info@miamiportable.com",
    website: "https://miamiportable.com",
    description:
      "Premier porta potty rental service in Miami and surrounding areas. We provide clean, reliable portable restrooms for events, construction sites, and outdoor gatherings. Family-owned business with over 15 years of experience.",
    features: {
      urinal: true,
      handWashing: true,
      sanitizer: true,
      lockingDoor: true,
      mirror: true,
    },
    type: "Luxury" as const,
    dailyRate: 4 as const,
    rating: 4.8,
    reviewCount: 127,
    yearsInBusiness: 15,
    serviceAreas: ["Miami", "Miami Beach", "Coral Gables", "Homestead", "Key Biscayne"],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2024-01-15",
        comment: "Excellent service! The units were spotless and delivered on time. Highly recommend for any event.",
      },
      {
        id: 2,
        name: "Mike Rodriguez",
        rating: 5,
        date: "2024-01-10",
        comment: "Used them for our construction site. Professional, reliable, and great customer service.",
      },
      {
        id: 3,
        name: "Emily Chen",
        rating: 4,
        date: "2024-01-05",
        comment: "Good quality units and fair pricing. Would use again for future events.",
      },
    ],
  }
}

export default function VendorDetailPage({ params }: { params: { slug: string } }) {
  const vendor = getVendorData(params.slug)

  const renderFeature = (hasFeature: boolean, label: string) => (
    <div className="flex items-center space-x-2">
      {hasFeature ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />}
      <span className={`${hasFeature ? "text-gray-700" : "text-gray-400"}`}>{label}</span>
    </div>
  )

  const renderPriceIcons = (rate: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <DollarSign key={i} className={`h-5 w-5 ${i < rate ? "text-green-600" : "text-gray-300"}`} />
    ))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-card p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vendor Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{vendor.name}</h1>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{vendor.address}</span>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {renderStars(vendor.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {vendor.rating} ({vendor.reviewCount} reviews)
                  </span>
                </div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    vendor.type === "Luxury" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {vendor.type}
                </span>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-sm text-gray-600 mr-2">Daily Rate:</span>
                <div className="flex items-center">{renderPriceIcons(vendor.dailyRate)}</div>
              </div>

              <p className="text-gray-700 mb-6">{vendor.description}</p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-600 mr-3" />
                  <a href={`tel:${vendor.phone}`} className="text-primary-600 hover:text-primary-700">
                    {vendor.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-600 mr-3" />
                  <a href={`mailto:${vendor.email}`} className="text-primary-600 hover:text-primary-700">
                    {vendor.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-primary-600 mr-3" />
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div>
              <div className="grid grid-cols-1 gap-4">
                <img
                  src={vendor.images[0] || "/placeholder.svg"}
                  alt={vendor.imageDescriptions?.[0] || `${vendor.name} - Main`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src={vendor.images[1] || "/placeholder.svg"}
                    alt={vendor.imageDescriptions?.[1] || `${vendor.name} - Image 2`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <img
                    src={vendor.images[2] || "/placeholder.svg"}
                    alt={vendor.imageDescriptions?.[2] || `${vendor.name} - Image 3`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFeature(vendor.features.urinal, "Urinal")}
                {renderFeature(vendor.features.handWashing, "Hand Washing Station")}
                {renderFeature(vendor.features.sanitizer, "Hand Sanitizer")}
                {renderFeature(vendor.features.lockingDoor, "Locking Door")}
                {renderFeature(vendor.features.mirror, "Mirror")}
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Areas</h2>
              <div className="flex flex-wrap gap-2">
                {vendor.serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {vendor.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">{renderStars(review.rating)}</div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get a Quote</h3>
              <p className="text-gray-600 mb-6">Contact {vendor.name} directly for pricing and availability.</p>

              <div className="space-y-4">
                <Button asChild className="w-full bg-primary-600 hover:bg-primary-700">
                  <a href={`tel:${vendor.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <a href={`mailto:${vendor.email}?subject=Porta Potty Rental Inquiry`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Years in Business:</span>
                    <span className="font-medium">{vendor.yearsInBusiness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Rating:</span>
                    <span className="font-medium">{vendor.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Reviews:</span>
                    <span className="font-medium">{vendor.reviewCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
