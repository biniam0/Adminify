"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, X, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import type { GuestHouseType } from "@/types/guest-room.type";

interface FilterCriteria {
  searchTerm: string;
  type: "All" | "Shared" | "Private";
  continent: string;
  country: string;
  city: string;
  facilities: string[];
  minRating: number;
}

interface FilterHeaderProps {
  guestHouses: GuestHouseType[];
  onFilterChange: (filteredHouses: GuestHouseType[]) => void;
}

// Predefined comprehensive options
const ALL_CONTINENTS = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

const POPULAR_COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Switzerland",
  "Austria",
  "Japan",
  "South Korea",
  "China",
  "India",
  "Thailand",
  "Singapore",
  "Malaysia",
  "Australia",
  "New Zealand",
  "Brazil",
  "Argentina",
  "Mexico",
  "Egypt",
  "South Africa",
  "Morocco",
  "Kenya",
  "Nigeria",
  "Russia",
  "Turkey",
  "Greece",
  "Portugal",
  "Denmark",
  "Sweden",
  "Norway",
  "Finland",
  "Belgium",
  "Ireland",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Croatia",
  "Iceland",
  "Israel",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Cambodia",
];

const COMMON_FACILITIES = [
  // Basic Amenities
  "Free WiFi",
  "Air Conditioning",
  "Heating",
  "Hot Water",
  "Electricity",
  "Clean Bedding",
  "Towels Provided",
  "Hair Dryer",
  "Iron & Ironing Board",

  // Kitchen & Dining
  "Kitchen Access",
  "Shared Kitchen",
  "Private Kitchen",
  "Refrigerator",
  "Microwave",
  "Coffee Maker",
  "Dining Area",
  "Cookware",
  "Free Breakfast",
  "Restaurant",
  "Room Service",
  "Mini Bar",

  // Bathroom
  "Private Bathroom",
  "Shared Bathroom",
  "Hot Shower",
  "Bathtub",
  "Toiletries",
  "24/7 Hot Water",

  // Technology
  "TV",
  "Cable TV",
  "Smart TV",
  "Netflix",
  "Work Desk",
  "Phone",
  "Laptop Safe",
  "Charging Station",
  "USB Ports",

  // Comfort & Furniture
  "Comfortable Bed",
  "Extra Pillows",
  "Blackout Curtains",
  "Fan",
  "Wardrobe",
  "Storage Space",
  "Seating Area",
  "Balcony",
  "Garden View",
  "City View",
  "Mountain View",
  "Ocean View",

  // Services
  "24/7 Reception",
  "Concierge",
  "Housekeeping",
  "Laundry Service",
  "Dry Cleaning",
  "Luggage Storage",
  "Wake-up Service",
  "Shuttle Service",
  "Airport Transfer",
  "Tour Assistance",
  "Currency Exchange",

  // Safety & Security
  "Security Camera",
  "Safe Deposit Box",
  "Door Lock",
  "Fire Extinguisher",
  "First Aid Kit",
  "Emergency Exit",
  "Well-lit Areas",
  "Security Guard",

  // Recreation & Wellness
  "Swimming Pool",
  "Gym",
  "Spa",
  "Sauna",
  "Jacuzzi",
  "Massage",
  "Yoga Classes",
  "Library",
  "Game Room",
  "Common Room",
  "Rooftop Terrace",
  "Garden",
  "BBQ Area",
  "Fire Place",

  // Business
  "Business Center",
  "Meeting Room",
  "Conference Room",
  "Printer",
  "Fax Service",
  "Photocopying",

  // Transportation
  "Parking",
  "Free Parking",
  "Valet Parking",
  "Bike Rental",
  "Car Rental",
  "Public Transport Access",
  "Taxi Service",

  // Social
  "Common Kitchen",
  "Social Events",
  "Community Board",
  "Local Tips",
  "Travel Information",
  "Map Provided",
  "Group Activities",

  // Special Features
  "Pet Friendly",
  "Family Friendly",
  "Wheelchair Accessible",
  "Non Smoking",
  "Smoking Area",
  "Quiet Hours",
  "Party Friendly",
  "Female Only",
  "Male Only",
  "Co-ed",
  "Eco Friendly",
  "Solar Power",
  "Organic Food",
  "Vegetarian Options",
  "Halal Food",
  "Kosher Food",
];

export function FilterHeader({
  guestHouses,
  onFilterChange,
}: FilterHeaderProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchTerm: "",
    type: "All",
    continent: "All",
    country: "All",
    city: "All",
    facilities: [],
    minRating: 0,
  });

  // Enhanced filter options combining data + predefined lists
  const filterOptions = useMemo(() => {
    // Get actual data from guest houses
    const actualContinents = [
      ...new Set(guestHouses.map((gh) => gh.location.continent)),
    ];
    const actualCountries = [
      ...new Set(guestHouses.map((gh) => gh.location.country)),
    ];
    const actualCities = [
      ...new Set(guestHouses.map((gh) => gh.location.city)),
    ];
    const actualFacilities = [
      ...new Set(guestHouses.flatMap((gh) => gh.facilities)),
    ];

    // Combine with predefined lists and remove duplicates
    const allContinents = [
      ...new Set([...actualContinents, ...ALL_CONTINENTS]),
    ].sort();
    const allCountries = [
      ...new Set([...actualCountries, ...POPULAR_COUNTRIES]),
    ].sort();
    const allCities = [...new Set(actualCities)].sort();
    const allFacilities = [
      ...new Set([...actualFacilities, ...COMMON_FACILITIES]),
    ].sort();

    // Separate available vs all options
    return {
      continents: allContinents,
      countries: allCountries,
      cities: allCities,
      facilities: allFacilities,
      availableContinents: actualContinents.sort(),
      availableCountries: actualCountries.sort(),
      availableFacilities: actualFacilities.sort(),
    };
  }, [guestHouses]);

  // Enhanced filtering logic
  const filteredGuestHouses = useMemo(() => {
    return guestHouses.filter((guestHouse) => {
      // Search term filter - more comprehensive
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          guestHouse.name.toLowerCase().includes(searchLower) ||
          guestHouse.address.toLowerCase().includes(searchLower) ||
          guestHouse.location.city.toLowerCase().includes(searchLower) ||
          guestHouse.location.country.toLowerCase().includes(searchLower) ||
          guestHouse.location.continent.toLowerCase().includes(searchLower) ||
          guestHouse.location.subcity.toLowerCase().includes(searchLower) ||
          guestHouse.location.nearby.toLowerCase().includes(searchLower) ||
          guestHouse.type.toLowerCase().includes(searchLower) ||
          guestHouse.facilities.some((facility) =>
            facility.toLowerCase().includes(searchLower)
          );

        if (!matchesSearch) return false;
      }

      // Type filter
      if (
        filters.type !== "All" &&
        guestHouse.type.toLowerCase() !== filters.type
      ) {
        return false;
      }

      // Location filters
      if (
        filters.continent !== "All" &&
        guestHouse.location.continent !== filters.continent
      ) {
        return false;
      }
      if (
        filters.country !== "All" &&
        guestHouse.location.country !== filters.country
      ) {
        return false;
      }
      if (filters.city !== "All" && guestHouse.location.city !== filters.city) {
        return false;
      }

      // Facilities filter
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((facility) =>
          guestHouse.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }

      // Rating filter - Fixed to handle both cases
      if (filters.minRating > 0) {
        const avgRating =
          guestHouse.feedback && guestHouse.feedback.length > 0
            ? guestHouse.feedback.reduce((sum, fb) => sum + fb.rating, 0) /
              guestHouse.feedback.length
            : 0;
        if (avgRating < filters.minRating) return false;
      }

      return true;
    });
  }, [guestHouses, filters]);

  // Update parent component when filtered results change
  useEffect(() => {
    onFilterChange(filteredGuestHouses);
  }, [filteredGuestHouses, onFilterChange]);

  const updateFilter = (newFilters: Partial<FilterCriteria>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleFacilityToggle = (facility: string) => {
    const updatedFacilities = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];

    updateFilter({ facilities: updatedFacilities });
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: "",
      type: "All",
      continent: "All",
      country: "All",
      city: "All",
      facilities: [],
      minRating: 0,
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.type !== "All") count++;
    if (filters.continent !== "All") count++;
    if (filters.country !== "All") count++;
    if (filters.city !== "All") count++;
    if (filters.facilities.length > 0) count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters]);

  // Helper function to check if option has data
  const hasGuestHousesForOption = (
    type: "continent" | "country",
    value: string
  ) => {
    if (type === "continent") {
      return filterOptions.availableContinents.includes(value);
    }
    return filterOptions.availableCountries.includes(value);
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b pb-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Search Input */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search guest houses, locations, facilities..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter({ searchTerm: e.target.value })}
            className="pl-10 h-9"
          />
        </div>

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Quick Filters */}
        <div className="flex items-center gap-2">
          {/* Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value: "All" | "Shared" | "Private") =>
              updateFilter({ type: value })
            }
          >
            <SelectTrigger className="w-28 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Shared">Shared</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>

          {/* Location Filter */}
          <Select
            value={filters.continent}
            onValueChange={(value) =>
              updateFilter({
                continent: value,
                country: "All",
                city: "All",
              })
            }
          >
            <SelectTrigger className="w-36 h-9">
              <MapPin className="h-4 w-4 mr-1" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Locations</SelectItem>
              {filterOptions.continents.map((continent) => (
                <SelectItem
                  key={continent}
                  value={continent}
                  className={
                    !hasGuestHousesForOption("continent", continent)
                      ? "text-muted-foreground"
                      : ""
                  }
                >
                  {continent}
                  {hasGuestHousesForOption("continent", continent) && " ✓"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating Filter */}
          <Select
            value={filters.minRating.toString()}
            onValueChange={(value) =>
              updateFilter({ minRating: parseInt(value) })
            }
          >
            <SelectTrigger className="w-32 h-9">
              <Star className="h-4 w-4 mr-1" />
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="1">⭐ 1+ Stars</SelectItem>
              <SelectItem value="2">⭐ 2+ Stars</SelectItem>
              <SelectItem value="3">⭐ 3+ Stars</SelectItem>
              <SelectItem value="4">⭐ 4+ Stars</SelectItem>
              <SelectItem value="5">⭐ 5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2">
              <Filter className="h-4 w-4" />
              More Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4" align="end">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Country</h4>
                <Select
                  value={filters.country}
                  onValueChange={(value) =>
                    updateFilter({
                      country: value,
                      city: "All",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="All">All Countries</SelectItem>
                    {filterOptions.countries.map((country) => (
                      <SelectItem
                        key={country}
                        value={country}
                        className={
                          !hasGuestHousesForOption("country", country)
                            ? "text-muted-foreground"
                            : ""
                        }
                      >
                        {country}
                        {hasGuestHousesForOption("country", country) && " ✓"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="font-medium mb-2">City</h4>
                <Select
                  value={filters.city}
                  onValueChange={(value) => updateFilter({ city: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="All">All Cities</SelectItem>
                    {filterOptions.cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Facilities</h4>
                  <span className="text-xs text-muted-foreground">
                    {filters.facilities.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-2">
                  {filterOptions.facilities.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={facility}
                        checked={filters.facilities.includes(facility)}
                        onCheckedChange={() => handleFacilityToggle(facility)}
                      />
                      <label
                        htmlFor={facility}
                        className={`text-sm leading-none cursor-pointer ${
                          !filterOptions.availableFacilities.includes(facility)
                            ? "text-muted-foreground"
                            : ""
                        }`}
                      >
                        {facility}
                        {filterOptions.availableFacilities.includes(facility) &&
                          " ✓"}
                      </label>
                    </div>
                  ))}
                </div>
                {filters.facilities.length > 0 && (
                  <div className="mt-3 p-2 bg-muted/30 rounded-md">
                    <p className="text-xs text-muted-foreground mb-2">
                      Selected facilities:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {filters.facilities.map((facility) => (
                        <Badge
                          key={facility}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleFacilityToggle(facility)}
                        >
                          {facility}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-9 gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}

        {/* Results Count */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredGuestHouses.length} of {guestHouses.length} properties
          </span>
        </div>
      </div>
    </header>
  );
}
