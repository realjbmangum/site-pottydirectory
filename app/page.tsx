import type { Metadata } from "next"
import { redirect } from "next/navigation"

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

export default function RootPage() {
  redirect("/porta-potty-rental")
}
