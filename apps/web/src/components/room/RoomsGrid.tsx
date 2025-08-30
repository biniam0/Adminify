"use client";

import type { RoomType } from "@/types/guest-room.type";
import { useRouter } from "next/navigation";
import { RoomCard } from "./RoomCard";

interface RoomsTableProps {
  rooms: RoomType[];
}

export default function RoomsGrid({ rooms = [] }: RoomsTableProps) {
  const router = useRouter();

  if (!rooms || rooms.length === 0) {
    return <p className="p-4 text-red-600">No room available, yet!</p>;
  }

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">All Rooms</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((room) => (
          <RoomCard
            key={`${room.guestHouseId}-${room.id}`}
            room={room}
            onClick={() => router.push(`/rooms/${room.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
