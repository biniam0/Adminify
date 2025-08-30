"use client";

import type { GuestHouseType } from "@/types/guest-room.type";
import { GuestHouseCard } from "./GuestHouseCard";
import { dummyGuestHouses } from "@/app/(main)/guest-houses/dummyData";

interface GuestHouseTableProps {
  guestHouses: GuestHouseType[];
}

export default function GuestHouseGrid({ guestHouses }: GuestHouseTableProps) {
  return (
    <div className="flex flex-col gap-3 p-2">
      <h1 className="text-2xl font-bold pl-1">Browse Guest Houses</h1>

      {guestHouses.length === 0 ? (
        <p className="text-red-600 p-1.5">No Guest house available, yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {guestHouses.map((guestHouse) => (
            <GuestHouseCard key={guestHouse.id} guestHouse={guestHouse} />
          ))}
        </div>
      )}
    </div>
  );
}

