import Link from "next/link"
import { MapPin, Check, X, DollarSign, Star, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VendorCardProps {
  vendor: {
    id: string
    name: string
    city: string
    state: string
    features: {
      urinal: boolean
      handWashing: boolean
      sanitizer: boolean
      lockingDoor: boolean
      mirror: boolean
    }
    type: "Standard" | "Luxury"
    dailyRate: 1 | 2 | 3 | 4
    slug: string
  }
}

export default function VendorCard({ vendor }: VendorCardProps) {
  const renderFeature = (hasFeature: boolean, label: string) => (
    <div className="flex items-center space-x-2 text-sm">
      {hasFeature ? (
        <Check className="h-4 w-4 text-success-600 flex-shrink-0" />
      ) : (
        <X className="h-4 w-4 text-secondary-400 flex-shrink-0" />
      )}
      <span className={hasFeature ? "text-secondary-700" : "text-secondary-400"}>{label}</span>
    </div>
  )

  const renderPriceIcons = (rate: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <DollarSign key={i} className={`h-4 w-4 ${i < rate ? "text-success-600" : "text-secondary-300"}`} />
    ))
  }

  return (
    <div className="glass-effect rounded-2xl shadow-modern hover:shadow-modern-hover transition-all duration-300 p-6 group">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
          {vendor.name}
        </h3>

        <div className="flex items-center text-secondary-600 mb-3">
          <MapPin className="h-4 w-4 mr-2 text-primary-600 flex-shrink-0" />
          <span className="text-sm">
            {vendor.city}, {vendor.state}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
              vendor.type === "Luxury" ? "bg-accent-100 text-accent-800" : "bg-primary-100 text-primary-800"
            }`}
          >
            {vendor.type} Porta Potty Rental
          </span>
          <div className="flex items-center space-x-1">{renderPriceIcons(vendor.dailyRate)}</div>
        </div>

        {/* Rating placeholder */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-4 w-4 text-warning-400 fill-current" />
            ))}
          </div>
          <span className="text-sm text-secondary-600">4.8 (127 reviews)</span>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-secondary-900 mb-3">Porta Potty Features</h4>
        <div className="grid grid-cols-1 gap-2">
          {renderFeature(vendor.features.urinal, "Urinal")}
          {renderFeature(vendor.features.handWashing, "Hand Washing")}
          {renderFeature(vendor.features.sanitizer, "Sanitizer")}
          {renderFeature(vendor.features.lockingDoor, "Locking Door")}
          {renderFeature(vendor.features.mirror, "Mirror")}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button asChild className="w-full gradient-primary hover:shadow-modern-lg transition-all duration-300">
          <Link href={`/porta-potty-rental/vendor/${vendor.slug}`}>View Porta Potty Rental Details</Link>
        </Button>

        <Button
          variant="outline"
          className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 transition-all duration-200"
        >
          <Phone className="h-4 w-4 mr-2" />
          Get Quote
        </Button>
      </div>
    </div>
  )
}
