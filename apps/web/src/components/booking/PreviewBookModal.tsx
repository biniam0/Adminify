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
import { apiClient } from "@/lib/api-client";

interface PreviewBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingData: BookingFormData | null;
  onBookingComplete: () => void;
}

interface ChapaResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  } | null;
}

interface ChapaCallbackParams {
  trx_ref: string;
  ref_id: string;
  status: string;
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

  const generateTransactionRef = (): string => {
    return `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleChapaPayment = async () => {
    if (!bookingData) return;

    setIsProcessingPayment(true);

    const transactionRef = generateTransactionRef();
    sessionStorage.setItem("chapa_tx_ref", transactionRef);
    sessionStorage.setItem("booking_data", JSON.stringify(bookingData));

    // Construct the payment payload requested by Chapa API
    const paymentData = {
      amount: billing.totalAmount.toString(),
      currency: "ETB",
      email: session?.user?.email || "customer@example.com",
      first_name: bookingData.name.split(" ")[0] || "Guest",
      last_name: bookingData.name.split(" ").slice(1).join(" ") || "User",
      tx_ref: transactionRef,
      callback_url: "http://localhost:3000/api/chapa/callback",
      return_url: `http://localhost:3001/booking/success?tx_ref=${transactionRef}`,
    };

    // const paymentData = {
    //   amount: billing.totalAmount.toString(),
    //   currency: "ETB",
    //   email: session?.user?.email || "customer@example.com",
    //   first_name: "Test",
    //   last_name: "User",
    //   tx_ref: transactionRef,
    //   callback_url: `${window.location.origin}/api/chapa/callback`,
    //   return_url: `${window.location.origin}booking/success`,
    // };

    try {
      const response = await apiClient.post(
        "/api/chapa/payment/initialize",
        paymentData
      );
      console.log("Sent payment data:", paymentData);

      const checkoutUrl = response.data.data?.checkout_url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl; // Redirect to Chapa checkout
      } else {
        console.error("No checkout URL returned:", response.data);
        toast.error("Payment initialization failed. Please try again.");
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error("Chapa payment initialization failed:", error);
      toast.error("Payment initialization failed. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  // Function to verify payment (you'll call this from your callback/return URL handler)
  const verifyPayment = async (txRef: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://api.chapa.co/v1/transaction/verify/${txRef}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          },
        }
      );

      const result = await response.json();

      if (result.status === "success" && result.data?.status === "success") {
        // Payment verified successfully
        return true;
      }

      return false;
    } catch (error) {
      console.error("Payment verification failed:", error);
      return false;
    }
  };

  // Function to handle successful payment and create booking
  const handlePaymentSuccess = async (txRef: string) => {
    try {
      const savedBookingData = sessionStorage.getItem("booking_data");
      if (!savedBookingData) throw new Error("Booking data not found");

      const bookingData = JSON.parse(savedBookingData) as BookingFormData;

      const bookingPayload = {
        roomId: bookingData.room.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        paymentReference: txRef,
        paymentStatus: "completed",
        paymentMethod: "chapa",
        totalAmount: calculateBilling().totalAmount,
      };

      await createBooking(session!.user, bookingPayload);

      // Clean up session storage
      sessionStorage.removeItem("chapa_tx_ref");
      sessionStorage.removeItem("booking_data");

      toast.success("Booking confirmed successfully!", { id: "payment" });
      onBookingComplete();
    } catch (error) {
      console.error("Booking creation failed:", error);
      toast.error(
        "Payment successful but booking creation failed. Please contact support.",
        { id: "payment" }
      );
    }
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
            Review your booking details and proceed with payment via Chapa.
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
                  {bookingData.guestHouse.about?.review?.averageRating ?? "N/A"}
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

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Payment Info:</strong> You'll be redirected to Chapa's
              secure payment page to complete your transaction.
            </p>
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
              onClick={handleChapaPayment}
              disabled={isProcessingPayment}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessingPayment ? "Redirecting..." : "Pay Now via Chapa"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
