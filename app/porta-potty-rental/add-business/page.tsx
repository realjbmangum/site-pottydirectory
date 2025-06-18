"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageBackground from "@/components/page-background"

export default function AddBusinessPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
    description: "",
    serviceAreas: "",
    features: {
      urinal: false,
      handWashing: false,
      sanitizer: false,
      lockingDoor: false,
      mirror: false,
    },
    types: {
      standard: false,
      luxury: false,
    },
    dailyRateRange: "",
    insurance: false,
    yearsInBusiness: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Business submission:", formData)
    alert("Thank you for your submission! We'll review your application and get back to you within 2-3 business days.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      if (name.startsWith("features.")) {
        const feature = name.split(".")[1]
        setFormData({
          ...formData,
          features: {
            ...formData.features,
            [feature]: checkbox.checked,
          },
        })
      } else if (name.startsWith("types.")) {
        const type = name.split(".")[1]
        setFormData({
          ...formData,
          types: {
            ...formData.types,
            [type]: checkbox.checked,
          },
        })
      } else {
        setFormData({
          ...formData,
          [name]: checkbox.checked,
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <PageBackground variant="default">
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-shadow-strong">Add Your Business</h1>
            <p className="text-lg text-gray-700 text-shadow-soft">
              Join our network of trusted porta potty rental companies and grow your business.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-primary-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Increased Visibility</h3>
                  <p className="text-gray-600">Get found by customers searching in your area.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Quality Leads</h3>
                  <p className="text-gray-600">Connect with customers ready to book.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-6 w-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Easy Management</h3>
                  <p className="text-gray-600">Simple tools to manage your listings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    >
                      <option value="">Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      {/* Add more states as needed */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Service Details</h3>

                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-vertical"
                    placeholder="Describe your business and services..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Available Features *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(formData.features).map(([feature, checked]) => (
                      <label key={feature} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name={`features.${feature}`}
                          checked={checked}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {feature === "handWashing"
                            ? "Hand Washing"
                            : feature === "lockingDoor"
                              ? "Locking Door"
                              : feature}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Unit Types Available *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="types.standard"
                        checked={formData.types.standard}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Standard</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="types.luxury"
                        checked={formData.types.luxury}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Luxury</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="dailyRateRange" className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Rate Range *
                  </label>
                  <select
                    id="dailyRateRange"
                    name="dailyRateRange"
                    required
                    value={formData.dailyRateRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    <option value="">Select Rate Range</option>
                    <option value="1">$ - Under $50/day</option>
                    <option value="2">$$ - $50-100/day</option>
                    <option value="3">$$$ - $100-150/day</option>
                    <option value="4">$$$$ - Over $150/day</option>
                  </select>
                </div>
              </div>

              {/* Verification */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Verification</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="insurance"
                      checked={formData.insurance}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that my business is fully insured and licensed to operate in my service areas. *
                    </span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 py-3">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageBackground>
  )
}
