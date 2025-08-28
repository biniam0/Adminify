"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { GuestHouseType, RoomType } from "@/types/guest-room.type";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import { createBooking } from "@/actions/booking/create-booking";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookRoomModal({ open, onOpenChange }: Props) {
  const [selectedGuestHouse, setSelectedGuestHouse] = useState("");
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [guestHouses, setGuestHouses] = useState<GuestHouseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getGuestHouses();
      setGuestHouses(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const gh = guestHouses.find((g) => g.id === selectedGuestHouse);
    setRooms(gh?.rooms ?? []);
    setSelectedRoom("");
  }, [selectedGuestHouse, guestHouses]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const bookingData = {
      roomId: selectedRoom,
      checkIn: formData.get("check-in") as string,
      checkOut: formData.get("check-out") as string,
      guests: Number(formData.get("guests")),
    };
    try {
      const booking = await createBooking(bookingData);

      toast.success(
        booking.status === "APPROVED"
          ? `Booking confirmed instantly for Room ${booking.roomId}`
          : `Booking submitted. Waiting for approval.`
      );

      onOpenChange(false);
    } catch (err) {
      toast.error("Failed to create booking");
    }
  };

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Room</DialogTitle>
          <DialogDescription>
            Select guest house and room, then enter your details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="guest-house">Guest House</Label>
            <Select
              value={selectedGuestHouse}
              onValueChange={setSelectedGuestHouse}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Guest House" />
              </SelectTrigger>
              <SelectContent>
                {guestHouses.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="room">Room</Label>
            <Select
              value={selectedRoom}
              onValueChange={setSelectedRoom}
              disabled={!rooms.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="check-in">Check-in Date</Label>
            <Input id="check-in" name="check-in" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="check-out">Check-out Date</Label>
            <Input id="check-out" name="check-out" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input id="guests" name="guests" type="number" min="1" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card">Payment Info (Mock)</Label>
            <Input id="card" name="card" placeholder="1234 5678 9012 3456" />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedGuestHouse || !selectedRoom}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
