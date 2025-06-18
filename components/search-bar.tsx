"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({
  onSearch,
  placeholder = "Enter city or state...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchQuery = query.trim()

    if (searchQuery) {
      if (onSearch) {
        onSearch(searchQuery)
      } else {
        // Navigate to search page
        router.push(`/porta-potty-rental/search?q=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl ${className}`}>
      <div className="relative flex items-center bg-white rounded-2xl shadow-modern-lg border border-gray-200 overflow-hidden hover:shadow-modern-xl transition-all duration-300">
        <div className="absolute left-4 z-10">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 pl-12 pr-4 py-4 text-base text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
        />
        <Button
          type="submit"
          className="m-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-modern hover:shadow-modern-lg"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>
    </form>
  )
}
