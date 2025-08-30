"use client";

import { useState, useEffect } from "react";
import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import type { GuestHouseType } from "@/types/guest-room.type";
import { BookRoomModal, type BookingFormData } from "../booking/BookRoomModal";
import { PreviewBookModal } from "../booking/PreviewBookModal";

export function BookRoomPage({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [guestHouses, setGuestHouses] = useState<GuestHouseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getGuestHouses();
      setGuestHouses(data);
      setLoading(false);
    })();
  }, []);

  const handleBookingSubmit = (data: BookingFormData) => {
    setBookingData(data);
    onOpenChange(false);
    setShowPreviewModal(true);
  };

  const handleBookingComplete = () => {
    setShowPreviewModal(false);
    setBookingData(null);
  };

  const handlePreviewClose = (open: boolean) => {
    setShowPreviewModal(open);
    if (!open) {
      setBookingData(null);
    }
  };

  if (loading) return null;

  return (
    <>
      <BookRoomModal
        open={open}
        onOpenChange={onOpenChange}
        onBookingSubmit={handleBookingSubmit}
        guestHouses={guestHouses}
        loading={loading}
      />

      <PreviewBookModal
        open={showPreviewModal}
        onOpenChange={handlePreviewClose}
        bookingData={bookingData}
        onBookingComplete={handleBookingComplete}
      />
    </>
  );
}
