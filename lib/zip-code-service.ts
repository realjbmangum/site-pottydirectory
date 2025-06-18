// Types for zip code data
export interface ZipCodeData {
  zipCode: string
  city: string
  state: string
  stateCode: string
  latitude: number
  longitude: number
  county?: string
}

export interface LocationSearchResult {
  type: "zipcode" | "city" | "state"
  query: string
  location: {
    city: string
    state: string
    stateCode: string
    zipCode?: string
    latitude?: number
    longitude?: number
  }
}

// Free zip code API service
class ZipCodeService {
  private cache = new Map<string, ZipCodeData>()

  // Use free zippopotam.us API (no API key required)
  async getLocationFromZipCode(zipCode: string): Promise<ZipCodeData | null> {
    // Check cache first
    if (this.cache.has(zipCode)) {
      return this.cache.get(zipCode)!
    }

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)

      if (!response.ok) {
        return null
      }

      const data = await response.json()

      if (data && data.places && data.places.length > 0) {
        const place = data.places[0]
        const locationData: ZipCodeData = {
          zipCode: data["post code"],
          city: place["place name"],
          state: place["state"],
          stateCode: place["state abbreviation"],
          latitude: Number.parseFloat(place["latitude"]),
          longitude: Number.parseFloat(place["longitude"]),
          county: place["county"],
        }

        // Cache the result
        this.cache.set(zipCode, locationData)
        return locationData
      }

      return null
    } catch (error) {
      console.error("Error fetching zip code data:", error)
      return null
    }
  }

  // Parse search query to determine if it's a zip code, city, or state
  parseSearchQuery(query: string): LocationSearchResult | null {
    const trimmedQuery = query.trim()

    // Check if it's a 5-digit zip code
    const zipCodeRegex = /^\d{5}$/
    if (zipCodeRegex.test(trimmedQuery)) {
      return {
        type: "zipcode",
        query: trimmedQuery,
        location: {
          city: "",
          state: "",
          stateCode: "",
          zipCode: trimmedQuery,
        },
      }
    }

    // Check if it's city, state format
    const cityStateRegex = /^([^,]+),\s*([A-Z]{2}|[A-Za-z\s]+)$/
    const cityStateMatch = trimmedQuery.match(cityStateRegex)
    if (cityStateMatch) {
      const city = cityStateMatch[1].trim()
      const state = cityStateMatch[2].trim()

      return {
        type: "city",
        query: trimmedQuery,
        location: {
          city,
          state,
          stateCode: state.length === 2 ? state.toUpperCase() : this.getStateCode(state),
        },
      }
    }

    // Check if it's just a state
    const stateCode = this.getStateCode(trimmedQuery)
    if (stateCode) {
      return {
        type: "state",
        query: trimmedQuery,
        location: {
          city: "",
          state: this.getStateName(stateCode),
          stateCode,
        },
      }
    }

    // Default to city search
    return {
      type: "city",
      query: trimmedQuery,
      location: {
        city: trimmedQuery,
        state: "",
        stateCode: "",
      },
    }
  }

  // Helper function to get state code from state name
  private getStateCode(stateName: string): string {
    const states: Record<string, string> = {
      alabama: "AL",
      alaska: "AK",
      arizona: "AZ",
      arkansas: "AR",
      california: "CA",
      colorado: "CO",
      connecticut: "CT",
      delaware: "DE",
      florida: "FL",
      georgia: "GA",
      hawaii: "HI",
      idaho: "ID",
      illinois: "IL",
      indiana: "IN",
      iowa: "IA",
      kansas: "KS",
      kentucky: "KY",
      louisiana: "LA",
      maine: "ME",
      maryland: "MD",
      massachusetts: "MA",
      michigan: "MI",
      minnesota: "MN",
      mississippi: "MS",
      missouri: "MO",
      montana: "MT",
      nebraska: "NE",
      nevada: "NV",
      "new hampshire": "NH",
      "new jersey": "NJ",
      "new mexico": "NM",
      "new york": "NY",
      "north carolina": "NC",
      "north dakota": "ND",
      ohio: "OH",
      oklahoma: "OK",
      oregon: "OR",
      pennsylvania: "PA",
      "rhode island": "RI",
      "south carolina": "SC",
      "south dakota": "SD",
      tennessee: "TN",
      texas: "TX",
      utah: "UT",
      vermont: "VT",
      virginia: "VA",
      washington: "WA",
      "west virginia": "WV",
      wisconsin: "WI",
      wyoming: "WY",
    }

    const normalized = stateName.toLowerCase().trim()
    return states[normalized] || (stateName.length === 2 ? stateName.toUpperCase() : "")
  }

  // Helper function to get state name from code
  private getStateName(stateCode: string): string {
    const stateNames: Record<string, string> = {
      AL: "Alabama",
      AK: "Alaska",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      FL: "Florida",
      GA: "Georgia",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PA: "Pennsylvania",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming",
    }

    return stateNames[stateCode.toUpperCase()] || stateCode
  }

  // Calculate distance between two points (for radius search)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959 // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

export const zipCodeService = new ZipCodeService()
