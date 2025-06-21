import type React from "react"
import StructuredData from "@/components/structured-data"

export default function PortaPottyRentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = {
    name: "Porta Potty Directory",
    description:
      "Leading porta potty rental directory connecting customers with reliable portable restroom rental companies nationwide.",
    url: "https://portapottydirectory.com",
    logo: "https://portapottydirectory.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-PORTA-DIR",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://facebook.com/portapottydirectory",
      "https://twitter.com/portapottydirectory",
      "https://linkedin.com/company/portapottydirectory",
    ],
  }

  const websiteData = {
    url: "https://portapottydirectory.com",
    name: "Porta Potty Directory - Find Local Porta Potty Rentals",
    description:
      "Find reliable porta potty rental companies near you. Compare prices, features, and book portable restroom rentals.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://portapottydirectory.com/porta-potty-rental/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <StructuredData type="Organization" data={organizationData} />
      <StructuredData type="WebSite" data={websiteData} />
      {children}
    </>
  )
}
