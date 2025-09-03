import { createBooking } from "@/actions/booking/create-booking";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bath,
  Bed,
  CheckCircle,
  CreditCard,
  MapPin,
  Star,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import type { BookingFormData } from "./BookRoomModal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { BillingDetails } from "@/types/booking.type";

interface PreviewBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingData: BookingFormData | null;
  onBookingComplete: () => void;
}

export function PreviewBookModal({
  open,
  onOpenChange,
  bookingData,
  onBookingComplete,
}: PreviewBookModalProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const router = useRouter();

  const { session } = useAuth();

  if (!session) router.push("/signin");

  const calculateBilling = (): BillingDetails => {
    if (!bookingData)
      return {
        days: 0,
        months: 0,
        dailyRate: 0,
        monthlyRate: 0,
        totalAmount: 0,
        discount: 0,
      };

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const months = Math.ceil(days / 30);

    const basePrice = parseFloat(bookingData.room.price) || 1500;

    const dailyRate = basePrice;
    const monthlyRate = Math.floor(basePrice * 25);

    let totalAmount: number;
    let discount = 0;

    if (bookingData.paymentType === "daily") {
      totalAmount = dailyRate * days;
    } else {
      const fullPriceAmount = dailyRate * days;
      totalAmount = monthlyRate * months;
      discount = Math.max(0, fullPriceAmount - totalAmount);
    }

    return {
      days,
      months,
      dailyRate,
      monthlyRate,
      totalAmount,
      discount,
    };
  };

  const billing = calculateBilling();

  const simulatePayment = async () => {
    if (!bookingData) return;

    setIsProcessingPayment(true);
    toast.loading("Processing payment with Chapa...", { id: "payment" })
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      toast.success("Payment successful! Booking confirmed.", {
        id: "payment",
      });

      try {
        const bookingPayload = {
          roomId: bookingData.room.id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
        };

        await createBooking(session!.user, bookingPayload);

        onBookingComplete();
      } catch (err) {
        toast.error("Booking creation failed after payment");
      }
    } else {
      toast.error("Payment failed. Please try again.", { id: "payment" });
    }

    setIsProcessingPayment(false);
  };

  if (!bookingData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Booking Preview
          </DialogTitle>
          <DialogDescription>
            Review your booking details and proceed with payment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{bookingData.guestHouse.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  {bookingData.guestHouse.location.city},{" "}
                  {bookingData.guestHouse.location.country}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {bookingData.guestHouse.address}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm">
                  {bookingData.guestHouse.about.review.averageRating}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="mb-2">
              {bookingData.guestHouse.type} Guest House
            </Badge>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  {bookingData.room.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {bookingData.room.type} Room
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {bookingData.room.description}
                </p>
              </div>
              <Badge variant="outline">ETB {bookingData.room.price}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span>{bookingData.room.square_meters}m²</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Max {bookingData.room.max_occupancy}</span>
              </div>
              {bookingData.room.living_features.wifi_available && (
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <span>WiFi</span>
                </div>
              )}
              {bookingData.room.living_features.tv && (
                <div className="flex items-center gap-1">
                  <Tv className="w-3 h-3" />
                  <span>TV</span>
                </div>
              )}
              {bookingData.room.living_features.private_bathroom && (
                <div className="flex items-center gap-1">
                  <Bath className="w-3 h-3" />
                  <span>Private Bath</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Guest Name</span>
              <span className="font-medium">{bookingData.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Check-in</span>
              <span className="font-medium">
                {new Date(bookingData.checkIn).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Check-out</span>
              <span className="font-medium">
                {new Date(bookingData.checkOut).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Guests</span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="font-medium">{bookingData.guests}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Duration</span>
              <span className="font-medium">
                {bookingData.paymentType === "daily"
                  ? `${billing.days} days`
                  : `${billing.months} months`}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Type</span>
              <Badge
                variant={
                  bookingData.paymentType === "daily" ? "default" : "secondary"
                }
              >
                {bookingData.paymentType === "daily" ? "Daily" : "Monthly"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Billing Summary
            </h4>

            <div className="bg-blue-50 p-3 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {bookingData.paymentType === "daily"
                    ? "Daily Rate"
                    : "Monthly Rate"}
                </span>
                <span className="font-medium">
                  ETB{" "}
                  {bookingData.paymentType === "daily"
                    ? billing.dailyRate.toLocaleString()
                    : billing.monthlyRate.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">
                  Duration (
                  {bookingData.paymentType === "daily"
                    ? `${billing.days} days`
                    : `${billing.months} months`}
                  )
                </span>
                <span className="font-medium">
                  ×
                  {bookingData.paymentType === "daily"
                    ? billing.days
                    : billing.months}
                </span>
              </div>

              {billing.discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span className="text-sm">Monthly Discount</span>
                  <span className="font-medium">
                    - ETB {billing.discount.toLocaleString()}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">
                  ETB {billing.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessingPayment}
            >
              Back to Edit
            </Button>
            <Button
              onClick={simulatePayment}
              disabled={isProcessingPayment}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessingPayment ? "Processing..." : "Pay Now via Chapa"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
