import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import { Button } from "@/components/ui/button";
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
import { Bed, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { GuestHouseType, RoomType } from "@/types/guest-room.type";
import { PreviewBookModal } from "./PreviewBookModal";

export type PaymentType = "daily" | "monthly";

export interface BookingFormData {
  guestHouse: GuestHouseType;
  room: RoomType;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  paymentType: PaymentType;
  card: string;
}

interface BookRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingSubmit: (bookingData: BookingFormData) => void;
  guestHouses: GuestHouseType[];
  loading: boolean;
}

export function BookRoomModal({
  open,
  onOpenChange,
  onBookingSubmit,
  guestHouses,
  loading,
}: BookRoomModalProps) {
  const [selectedGuestHouse, setSelectedGuestHouse] = useState("");
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [paymentType, setPaymentType] = useState<PaymentType>("daily");

  useEffect(() => {
    const gh = guestHouses.find((g) => g.id === selectedGuestHouse);
    setRooms(gh?.rooms ?? []);
    setSelectedRoom("");
  }, [selectedGuestHouse, guestHouses]);

  const handleBookingPreview = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const guestHouse = guestHouses.find((g) => g.id === selectedGuestHouse)!;
    const room = rooms.find((r) => r.id === selectedRoom)!;

    const bookingData: BookingFormData = {
      guestHouse,
      room,
      checkIn: formData.get("check-in") as string,
      checkOut: formData.get("check-out") as string,
      guests: Number(formData.get("guests")),
      name: formData.get("name") as string,
      paymentType,
      card: formData.get("card") as string,
    };

    onBookingSubmit(bookingData);
  };

  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Room</DialogTitle>
          <DialogDescription>
            Select guest house and room, then enter your details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBookingPreview} className="space-y-4">
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
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{g.name}</span>
                      <span className="text-xs text-gray-500">
                        {g.location.city}, {g.location.country}
                      </span>
                    </div>
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
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{r.name}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{r.type}</span>
                        <span>•</span>
                        <span>ETB {r.price}</span>
                        <span>•</span>
                        <span>{r.square_meters}m²</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room Details Preview */}
          {selectedRoomData && (
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Bed className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Room Details</span>
              </div>
              <div className="space-y-1 text-gray-600">
                <p>Max Occupancy: {selectedRoomData.max_occupancy} guests</p>
                <p>Size: {selectedRoomData.square_meters} square meters</p>
                <p>
                  Features:{" "}
                  {selectedRoomData.living_features.private_bathroom
                    ? "Private Bath"
                    : "Shared Bath"}
                  ,
                  {selectedRoomData.living_features.wifi_available
                    ? " WiFi"
                    : ""}
                  {selectedRoomData.living_features.tv ? ", TV" : ""}
                </p>
              </div>
            </div>
          )}

          {/* Payment Type Selector */}
          <div className="grid gap-3">
            <Label>Payment Option</Label>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentType === "daily"
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentType("daily")}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Daily</span>
                </div>
                <p className="text-xs text-gray-600">Flexible stays</p>
                <p className="text-xs text-gray-500">Pay per day</p>
              </div>

              <div
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentType === "monthly"
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentType("monthly")}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Monthly</span>
                </div>
                <p className="text-xs text-gray-600">Long term</p>
                <p className="text-xs text-green-600">Better rates</p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="check-in">Check-in Date</Label>
              <Input id="check-in" name="check-in" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="check-out">Check-out Date</Label>
              <Input id="check-out" name="check-out" type="date" required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={selectedRoomData?.max_occupancy || 10}
              required
            />
            {selectedRoomData && (
              <p className="text-xs text-gray-500">
                Maximum {selectedRoomData.max_occupancy} guests for this room
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedGuestHouse || !selectedRoom}
              className="w-full"
            >
              Review Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
