// apps/web/src/app/(main)/booking/success/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
  Users,
  Bed,
  CreditCard,
  Download,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { createBooking } from "@/actions/booking/create-booking";
import { useAuth } from "@/hooks/useAuth";
import type { BookingFormData } from "@/components/booking/BookRoomModal";

type PaymentStatus = "verifying" | "success" | "failed" | "expired";

interface ChapaVerificationResponse {
  message: string;
  status: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    currency: string;
    amount: string;
    charge: string;
    mode: string;
    method: string;
    type: string;
    status: string;
    reference: string;
    tx_ref: string;
    customization: {
      title: string;
      description: string;
    };
    meta: Record<string, string>;
    created_at: string;
    updated_at: string;
  } | null;
}

interface BookingDetails {
  bookingId: string;
  guestHouseName: string;
  roomName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentType: string;
  totalAmount: number;
  paymentReference: string;
}

export default function BookingSuccessPage() {
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("verifying");
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [chapaResponse, setChapaResponse] =
    useState<ChapaVerificationResponse | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { session } = useAuth();

  const txRef = searchParams.get("tx_ref");
  const maxVerificationAttempts = 3;

  const verifyPaymentWithChapa = async (
    txRef: string
  ): Promise<ChapaVerificationResponse> => {
    const response = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${txRef}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const calculateBilling = (bookingData: BookingFormData) => {
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

  const createBookingRecord = async (
    bookingData: BookingFormData,
    txRef: string,
    chapaData: any
  ) => {
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const billing = calculateBilling(bookingData);

    const bookingPayload = {
      roomId: bookingData.room.id,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      guestName: bookingData.name,
      paymentReference: txRef,
      paymentStatus: "completed",
      paymentMethod: "chapa",
      paymentType: bookingData.paymentType,
      totalAmount: billing.totalAmount,
      paymentData: {
        chapaReference: chapaData.reference,
        amount: chapaData.amount,
        currency: chapaData.currency,
        method: chapaData.method,
        createdAt: chapaData.created_at,
      },
    };

    const result = await createBooking(session.user, bookingPayload);

    // Create booking details for display
    const details: BookingDetails = {
      bookingId: result.bookingId || `BK-${Date.now()}`,
      guestHouseName: bookingData.guestHouse.name,
      roomName: bookingData.room.name,
      guestName: bookingData.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      paymentType: bookingData.paymentType,
      totalAmount: billing.totalAmount,
      paymentReference: txRef,
    };

    setBookingDetails(details);
    return result;
  };

  const retryVerification = async () => {
    if (!txRef || verificationAttempts >= maxVerificationAttempts) return;

    setVerificationAttempts((prev) => prev + 1);
    setPaymentStatus("verifying");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      await handlePaymentVerification();
    } catch (error) {
      console.error("Retry verification failed:", error);
      if (verificationAttempts >= maxVerificationAttempts - 1) {
        setPaymentStatus("failed");
        toast.error(
          "Maximum verification attempts reached. Please contact support."
        );
      }
    }
  };

  const handlePaymentVerification = async () => {
    if (!txRef) {
      setPaymentStatus("failed");
      toast.error("Invalid payment reference");
      return;
    }

    try {
      // Get booking data from session storage
      const savedBookingData = sessionStorage.getItem("booking_data");
      if (!savedBookingData) {
        // Try to get from URL params as backup
        const backupData = searchParams.get("booking_data");
        if (!backupData) {
          throw new Error(
            "Booking data not found. Please contact support with your payment reference."
          );
        }
      }

      const parsedBookingData = JSON.parse(
        savedBookingData || "{}"
      ) as BookingFormData;
      setBookingData(parsedBookingData);

      // Verify payment with Chapa
      const chapaResult = await verifyPaymentWithChapa(txRef);
      setChapaResponse(chapaResult);

      if (
        chapaResult.status === "success" &&
        chapaResult.data?.status === "success"
      ) {
        // Payment is successful, create booking record
        await createBookingRecord(parsedBookingData, txRef, chapaResult.data);

        // Clean up session storage
        sessionStorage.removeItem("chapa_tx_ref");
        sessionStorage.removeItem("booking_data");

        setPaymentStatus("success");
        toast.success("Payment verified and booking confirmed!");
      } else if (chapaResult.data?.status === "pending") {
        // Payment is still pending, retry after a delay
        if (verificationAttempts < maxVerificationAttempts) {
          toast.loading(
            "Payment is still processing, retrying verification..."
          );
          setTimeout(() => retryVerification(), 5000);
        } else {
          setPaymentStatus("failed");
          toast.error("Payment verification timeout. Please contact support.");
        }
      } else {
        // Payment failed
        setPaymentStatus("failed");
        toast.error(`Payment verification failed: ${chapaResult.message}`);
      }
    } catch (error) {
      console.error("Payment verification or booking creation failed:", error);

      if (verificationAttempts < maxVerificationAttempts) {
        toast.error("Verification failed, retrying...");
        setTimeout(() => retryVerification(), 3000);
      } else {
        setPaymentStatus("failed");
        toast.error(
          "An error occurred while processing your booking. Please contact support."
        );
      }
    }
  };

  useEffect(() => {
    if (!session?.user) {
      router.push("/signin?redirect=/booking/success");
      return;
    }

    handlePaymentVerification();
  }, [txRef, session]);

  const handleReturnHome = () => {
    router.push("/");
  };

  const handleViewBookings = () => {
    router.push("/bookings");
  };

  const handleRetryBooking = () => {
    router.push("/booking");
  };

  const handleContactSupport = () => {
    // You can redirect to support page or open email client
    window.location.href = `mailto:support@yourdomain.com?subject=Booking Issue - Reference: ${txRef}&body=I need help with my booking payment. Reference: ${txRef}`;
  };

  const handleDownloadReceipt = () => {
    if (!bookingDetails || !chapaResponse?.data) return;

    // Generate a simple receipt (you might want to create a proper PDF)
    const receiptData = {
      bookingId: bookingDetails.bookingId,
      date: new Date().toLocaleDateString(),
      guestHouse: bookingDetails.guestHouseName,
      room: bookingDetails.roomName,
      guest: bookingDetails.guestName,
      checkIn: new Date(bookingDetails.checkIn).toLocaleDateString(),
      checkOut: new Date(bookingDetails.checkOut).toLocaleDateString(),
      guests: bookingDetails.guests,
      amount: bookingDetails.totalAmount,
      paymentMethod: "Chapa",
      reference: bookingDetails.paymentReference,
    };

    const receiptContent = `
BOOKING RECEIPT
===============

Booking ID: ${receiptData.bookingId}
Date: ${receiptData.date}

GUEST DETAILS
Guest Name: ${receiptData.guest}
Number of Guests: ${receiptData.guests}

ACCOMMODATION DETAILS
Guest House: ${receiptData.guestHouse}
Room: ${receiptData.room}
Check-in: ${receiptData.checkIn}
Check-out: ${receiptData.checkOut}

PAYMENT DETAILS
Amount: ETB ${receiptData.amount.toLocaleString()}
Payment Method: ${receiptData.paymentMethod}
Reference: ${receiptData.reference}

Thank you for your booking!
    `.trim();

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking-receipt-${bookingDetails.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (paymentStatus === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-8">
            <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600 mb-4">
              Please wait while we confirm your payment with Chapa...
            </p>
            {verificationAttempts > 0 && (
              <p className="text-sm text-gray-500">
                Verification attempt {verificationAttempts} of{" "}
                {maxVerificationAttempts}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === "success" && bookingDetails) {
    const billing = bookingData ? calculateBilling(bookingData) : null;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Header */}
          <Card>
            <CardContent className="text-center p-8">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 mb-4">
                Your payment was successful and your booking has been confirmed.
              </p>
              <Badge
                variant="outline"
                className="text-green-700 border-green-200 bg-green-50"
              >
                Booking ID: {bookingDetails.bookingId}
              </Badge>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bed className="w-5 h-5" />
                Booking Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Guest House</span>
                  <span className="font-medium">
                    {bookingDetails.guestHouseName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Room</span>
                  <span className="font-medium">{bookingDetails.roomName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Guest Name</span>
                  <span className="font-medium">
                    {bookingDetails.guestName}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Check-in
                  </span>
                  <span className="font-medium">
                    {new Date(bookingDetails.checkIn).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Check-out
                  </span>
                  <span className="font-medium">
                    {new Date(bookingDetails.checkOut).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Guests
                  </span>
                  <span className="font-medium">{bookingDetails.guests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Type</span>
                  <Badge
                    variant={
                      bookingDetails.paymentType === "daily"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {bookingDetails.paymentType === "daily"
                      ? "Daily"
                      : "Monthly"}
                  </Badge>
                </div>
                {billing && billing.days && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">
                      {bookingDetails.paymentType === "daily"
                        ? `${billing.days} days`
                        : `${billing.months} months`}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </h2>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-xl font-bold text-green-700">
                    ETB {bookingDetails.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">Chapa</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reference</span>
                  <span className="font-mono text-sm">
                    {bookingDetails.paymentReference}
                  </span>
                </div>
                {chapaResponse?.data && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Transaction Date</span>
                    <span className="font-medium">
                      {new Date(
                        chapaResponse.data.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <Button onClick={handleViewBookings} className="w-full">
                  View My Bookings
                </Button>
                <Button
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button
                  onClick={handleReturnHome}
                  variant="outline"
                  className="w-full"
                >
                  Return to Home
                </Button>
                <Button
                  onClick={handleContactSupport}
                  variant="ghost"
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Payment Failed State
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="text-center p-8">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. This could be due to:
          </p>

          <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Payment is still processing</li>
              <li>• Network connectivity issues</li>
              <li>• Payment was declined</li>
              <li>• Technical error occurred</li>
            </ul>
          </div>

          {txRef && (
            <div className="bg-blue-50 p-3 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>Reference:</strong> {txRef}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Please save this reference number for support
              </p>
            </div>
          )}

          <div className="space-y-3">
            {verificationAttempts < maxVerificationAttempts && (
              <Button
                onClick={retryVerification}
                className="w-full"
                disabled={verificationAttempts >= maxVerificationAttempts}
              >
                Retry Verification (
                {maxVerificationAttempts - verificationAttempts} attempts left)
              </Button>
            )}
            <Button
              onClick={handleRetryBooking}
              variant="outline"
              className="w-full"
            >
              Try Booking Again
            </Button>
            <Button
              onClick={handleContactSupport}
              variant="ghost"
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button
              onClick={handleReturnHome}
              variant="ghost"
              className="w-full text-sm"
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
