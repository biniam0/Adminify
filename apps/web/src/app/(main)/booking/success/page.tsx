// apps/web/src/app/(main)/booking/success/page.tsx

"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

type PaymentStatus = "verifying" | "success" | "failed" | "expired";

interface ChapaVerificationResponse {
  status: string;
  message: string;
  data: { status: string } | null;
}

function BookingSuccessContent() {
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("verifying");
  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const txRef = searchParams.get("tx_ref");

  // Call our own API route instead of Chapa directly
  const verifyPayment = async (
    txRef: string
  ): Promise<ChapaVerificationResponse> => {
    const res = await apiClient.get(`/api/chapa/verify-payment/${txRef}`);
    return res.data;
  };

  const handleVerification = async (): Promise<void> => {
    if (!txRef) {
      setPaymentStatus("failed");
      return;
    }

    try {
      setPaymentStatus("verifying");
      const result = await verifyPayment(txRef);

      if (result.status === "success" && result.data?.status === "success") {
        setPaymentStatus("success");
      } else if (result.data?.status === "pending") {
        if (retryCount < 5) {
          setRetryCount((prev) => prev + 1);
          setTimeout(() => handleVerification(), 3000);
        } else {
          toast.error("Payment is still pending. Please try again later.");
          setPaymentStatus("failed");
        }
      } else if (result.data?.status === "expired") {
        setPaymentStatus("expired");
      } else {
        setPaymentStatus("failed");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("We couldn't verify your payment.");
      setPaymentStatus("failed");
    }
  };

  useEffect(() => {
    if (txRef) handleVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txRef]);

  const handleClose = () => router.push("/");
  const handleRetry = async (): Promise<void> => {
    setRetrying(true);
    setRetryCount(0); // reset retry count
    await handleVerification();
    setRetrying(false);
  };

  const renderStatus = () => {
    switch (paymentStatus) {
      case "verifying":
        return (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
            <p className="mt-4 text-gray-600">
              Hang tight! We're confirming your payment…
            </p>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <p className="mt-4 text-green-700 font-medium">
              Woohoo! Payment successful 🎉
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Your booking has been confirmed.
            </p>
          </>
        );
      case "failed":
        return (
          <>
            <XCircle className="w-12 h-12 text-red-600 mx-auto" />
            <p className="mt-4 text-red-700 font-medium">
              Something went wrong
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We couldn't verify your payment. You can try again.
            </p>
          </>
        );
      case "expired":
        return (
          <>
            <Clock className="w-12 h-12 text-yellow-600 mx-auto" />
            <p className="mt-4 text-yellow-700 font-medium">
              Payment session expired
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please try booking again with a new payment.
            </p>
          </>
        );
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm text-center space-y-4">
        <DialogHeader>
          <DialogTitle>Payment Status</DialogTitle>
        </DialogHeader>

        <div className="py-4">{renderStatus()}</div>

        <div className="grid gap-2">
          {paymentStatus === "failed" && (
            <Button
              onClick={handleRetry}
              disabled={retrying}
              className="w-full"
            >
              {retrying ? "Retrying..." : "Retry Verification"}
            </Button>
          )}
          <Button onClick={handleClose} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <Dialog open={true}>
          <DialogContent className="max-w-sm text-center space-y-4">
            <DialogHeader>
              <DialogTitle>Payment Status</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
