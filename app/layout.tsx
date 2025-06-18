import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://portapottypro.com"),
  title: {
    default: "Porta Potty Rental Directory - Find Local Portable Restroom Rentals | PortaPotty Pro",
    template: "%s | PortaPotty Pro - Porta Potty Rental Directory",
  },
  description:
    "Find reliable porta potty rental companies near you. Compare prices, features, and book portable restroom rentals for events, construction sites, and outdoor gatherings. Trusted porta potty rental directory with verified vendors nationwide.",
  keywords: [
    "porta potty rental",
    "portable restroom rental",
    "porta potty rental near me",
    "portable toilet rental",
    "construction porta potty rental",
    "event porta potty rental",
    "luxury porta potty rental",
    "porta potty rental companies",
    "portable restroom services",
    "porta potty rental directory",
  ],
  authors: [{ name: "PortaPotty Pro" }],
  creator: "PortaPotty Pro",
  publisher: "PortaPotty Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portapottypro.com",
    siteName: "PortaPotty Pro - Porta Potty Rental Directory",
    title: "Find Local Porta Potty Rental Companies | PortaPotty Pro",
    description:
      "Discover trusted porta potty rental companies in your area. Compare features, prices, and book portable restroom rentals for any event or project.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PortaPotty Pro - Porta Potty Rental Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Local Porta Potty Rental Companies | PortaPotty Pro",
    description:
      "Discover trusted porta potty rental companies in your area. Compare features, prices, and book portable restroom rentals.",
    images: ["/og-image.jpg"],
    creator: "@portapottypro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="canonical" href="https://portapottypro.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
