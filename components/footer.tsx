import Link from "next/link"
import PortaPottyLogo from "@/components/porta-potty-logo"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/porta-potty-rental" className="flex items-center space-x-2 mb-4">
              <PortaPottyLogo size="lg" className="text-primary-400" />
              <span className="text-xl font-bold">PortaPotty Pro</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Find reliable porta potty rentals in your area. Compare prices, features, and book the perfect portable
              restroom for your event.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/states" className="text-gray-300 hover:text-white">
                  Browse States
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Business</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/add-business" className="text-gray-300 hover:text-white">
                  Add Your Business
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PortaPotty Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
