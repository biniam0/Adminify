"use client";

import { useState, useEffect } from "react";
import { getGuestHouses } from "@/actions/guestHouse/guestHouses"; 
import type { GuestHouseType } from "@/types/guest-room.type";
import { BookRoomModal } from "./BookRoomModal";

export function BookRoomPage({ open, onOpenChange }: { 
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [guestHouses, setGuestHouses] = useState<GuestHouseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getGuestHouses();
      setGuestHouses(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return null; 

  return (
    <BookRoomModal 
      open={open} 
      onOpenChange={onOpenChange} 
    />
  );
}
