"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/porta-potty-rental" className="group">
            <div className="py-4 px-6 shadow-lg rounded-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Image
                  src="/images/portapotty-logo.png"
                  alt="Porta Potty Directory Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
                <div className="text-center sm:text-left">
                  <div className="text-xl md:text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    Porta Potty Directory
                  </div>
                  <p className="text-sm text-gray-500">Find Local Porta Potty Rentals</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/porta-potty-rental"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/porta-potty-rental/states"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              Browse States
            </Link>
            <Link
              href="/porta-potty-rental/about"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/porta-potty-rental/contact"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
            <Button
              asChild
              className="gradient-primary hover:shadow-modern-lg transition-all duration-300 ml-2 lg:ml-4"
            >
              <Link href="/porta-potty-rental/add-business">
                <span className="hidden lg:inline">Add Your Business</span>
                <span className="lg:hidden">Add Business</span>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <Link
                href="/porta-potty-rental"
                className="px-4 py-3 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/porta-potty-rental/states"
                className="px-4 py-3 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse States
              </Link>
              <Link
                href="/porta-potty-rental/about"
                className="px-4 py-3 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/porta-potty-rental/contact"
                className="px-4 py-3 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 pt-2">
                <Button asChild className="w-full gradient-primary hover:shadow-modern-lg transition-all duration-300">
                  <Link href="/porta-potty-rental/add-business" onClick={() => setIsMenuOpen(false)}>
                    Add Your Business
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
