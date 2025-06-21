"use client"

import { useState } from "react"
import { Shield, Users, Star, Award, ChevronDown, ChevronUp } from "lucide-react"
import PageBackground from "@/components/page-background"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is the difference between a porta potty and a restroom trailer?",
    answer:
      "Porta potties are basic standalone units, while restroom trailers are larger, climate-controlled facilities with flushing toilets and running water.",
  },
  {
    question: "How often are porta potties cleaned?",
    answer: "Most companies clean units weekly for long-term rentals, and before/after delivery for short-term events.",
  },
  {
    question: "Do porta potties have hand washing stations or sanitizer?",
    answer:
      "Many units include sanitizer dispensers, and some offer separate hand washing stations. You can filter for this when browsing listings.",
  },
  {
    question: "Are porta potties climate controlled?",
    answer: "Standard units are not, but some deluxe or trailer options may include heat or A/C.",
  },
  {
    question: "Can I rent a porta potty for multiple days or long-term projects?",
    answer: "Yes. Many vendors offer long-term rentals for construction sites, seasonal use, or events.",
  },
  {
    question: "Is there a delivery fee?",
    answer:
      "Some vendors include delivery in the price, while others charge based on distance. Check the listing details or contact the vendor directly.",
  },
  {
    question: "Do I need a permit to place a porta potty on-site?",
    answer:
      "This varies by city and county. For public property, permits are often required. On private land, you're usually fine — but check local regulations.",
  },
  {
    question: "Can porta potties be used in winter?",
    answer: "Yes, but you'll need special additives to prevent freezing. Some vendors offer winter-ready units.",
  },
  {
    question: "How far in advance should I reserve?",
    answer:
      "For peak seasons or big events, book several weeks in advance. Last-minute rentals are often available but not guaranteed.",
  },
  {
    question: "What surface can a porta potty be placed on?",
    answer: "Grass, gravel, dirt, or pavement — as long as it's level and accessible by a truck or trailer.",
  },
]

function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
          >
            <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
            <div className="flex-shrink-0">
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-primary-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </button>

          {openItems.includes(index) && (
            <div className="px-6 pb-5">
              <div className="pt-2 border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <PageBackground variant="default">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-shadow-strong">About Porta Potty Directory</h1>
            <p className="text-xl text-gray-700 leading-relaxed text-shadow-soft">
              We're the leading platform connecting customers with reliable porta potty rental companies across the
              United States. Our mission is to make finding and booking portable restroom rentals simple, transparent,
              and trustworthy.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600">Verified Vendors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">50</div>
                <div className="text-gray-600">States Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Porta Potty Directory?</h2>
              <p className="text-lg text-gray-600">
                We're committed to providing the best experience for both customers and vendors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Vendors</h3>
                <p className="text-gray-600">
                  All our vendors are thoroughly vetted and insured for your peace of mind.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
                <p className="text-gray-600">
                  We prioritize customer satisfaction and work hard to exceed expectations.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600">
                  We maintain high standards to ensure you get clean, reliable portable restrooms.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Leaders</h3>
                <p className="text-gray-600">Recognized as the top platform for porta potty rentals nationwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Everything you need to know about porta potty rentals</p>
            </div>

            <FAQAccordion />

            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">
                  Can't find the answer you're looking for? Our customer support team is here to help.
                </p>
                <a
                  href="/porta-potty-rental/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageBackground>
  )
}
