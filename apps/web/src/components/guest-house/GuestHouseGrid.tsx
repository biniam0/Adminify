"use client";

import { useState } from "react";
import type { GuestHouseType } from "@/types/guest-room.type";
import { GuestHouseCard } from "./GuestHouseCard";
import { FilterHeader } from "@/components/FilterHeader";

interface GuestHouseGridProps {
  guestHouses: GuestHouseType[];
}

export function GuestHouseGrid({ guestHouses }: GuestHouseGridProps) {
  const [filteredGuestHouses, setFilteredGuestHouses] =
    useState<GuestHouseType[]>(guestHouses);

  const handleFilterChange = (filtered: GuestHouseType[]) => {
    setFilteredGuestHouses(filtered);
  };
  console.log("API base URL:", process.env.NEXT_PUBLIC_SERVER_URL);

  return (
    <>
      <FilterHeader
        guestHouses={guestHouses}
        onFilterChange={handleFilterChange}
      />
      <div className="flex flex-col gap-3 p-2">
        <h1 className="text-2xl font-bold pl-1">Browse Guest Houses</h1>

        {guestHouses.length === 0 ? (
          <p className="text-red-600 p-1.5">No Guest house available, yet!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
            {filteredGuestHouses.map((guestHouse) => (
              <GuestHouseCard key={guestHouse.id} guestHouse={guestHouse} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
