"use client"

import { useState, useEffect } from "react"
import { MapPin, TrendingUp } from "lucide-react"

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
  className?: string
}

// Mock suggestions data - will be replaced with database queries
const mockSuggestions = {
  cities: [
    { name: "Miami, FL", count: 23 },
    { name: "Austin, TX", count: 18 },
    { name: "Los Angeles, CA", count: 42 },
    { name: "Charlotte, NC", count: 15 },
    { name: "Dallas, TX", count: 28 },
    { name: "Orlando, FL", count: 16 },
  ],
  states: [
    { name: "Florida", count: 134 },
    { name: "Texas", count: 187 },
    { name: "California", count: 156 },
    { name: "North Carolina", count: 84 },
  ],
  popular: [
    "luxury porta potty rental",
    "wedding porta potty rental",
    "construction porta potty rental",
    "event porta potty rental",
  ],
}

export default function SearchSuggestions({ query, onSelect, className = "" }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<any[]>([])

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      return
    }

    // Filter suggestions based on query
    const filteredCities = mockSuggestions.cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase()),
    )
    const filteredStates = mockSuggestions.states.filter((state) =>
      state.name.toLowerCase().includes(query.toLowerCase()),
    )
    const filteredPopular = mockSuggestions.popular.filter((term) => term.toLowerCase().includes(query.toLowerCase()))

    const allSuggestions = [
      ...filteredCities.map((city) => ({ ...city, type: "city" })),
      ...filteredStates.map((state) => ({ ...state, type: "state" })),
      ...filteredPopular.map((term) => ({ name: term, type: "popular" })),
    ].slice(0, 6) // Limit to 6 suggestions

    setSuggestions(allSuggestions)
  }, [query])

  if (suggestions.length === 0) return null

  return (
    <div
      className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-modern-lg mt-2 z-50 ${className}`}
    >
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion.name)}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              {suggestion.type === "popular" ? (
                <TrendingUp className="h-4 w-4 text-gray-400" />
              ) : (
                <MapPin className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-gray-900">{suggestion.name}</span>
            </div>
            {suggestion.count && <span className="text-sm text-gray-500">{suggestion.count} companies</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
