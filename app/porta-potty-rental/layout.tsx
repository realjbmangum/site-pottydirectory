import type React from "react"
import StructuredData from "@/components/structured-data"

export default function PortaPottyRentalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = {
    name: "PortaPotty Pro",
    description:
      "Leading porta potty rental directory connecting customers with reliable portable restroom rental companies nationwide.",
    url: "https://portapottypro.com",
    logo: "https://portapottypro.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-POTTY-PRO",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://facebook.com/portapottypro",
      "https://twitter.com/portapottypro",
      "https://linkedin.com/company/portapottypro",
    ],
  }

  const websiteData = {
    url: "https://portapottypro.com",
    name: "PortaPotty Pro - Porta Potty Rental Directory",
    description:
      "Find reliable porta potty rental companies near you. Compare prices, features, and book portable restroom rentals.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://portapottypro.com/porta-potty-rental/search?q={search_term_string}",
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
