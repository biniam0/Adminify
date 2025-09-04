export interface PendingBook {
  id: string;

  checkIn: string;
  checkOut: string;
  guests: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  transactionRef: string;
  paymentInfo: string;

  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  room: {
    id: string;
    name: string;
    price: string;
    roomId: string;
  };

  approvedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  approvedById: string | null;
}

type ActivityAction = "BOOKED" | "APPROVED_BOOKING";

export interface ActionType {
  id: string;
  action: ActivityAction;
  timestamp: string;
  userId: string;
  bookingId: string;
  roomId: string;
  guestHouseId: string | null;
  historyId: string | null;
  details: {
    status: "APPROVED" | "REJECTED";
    autoApproved?: boolean;
    amount: number;
  };
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface BillingDetails {
  days: number;
  months: number;
  dailyRate: number;
  monthlyRate: number;
  totalAmount: number;
  discount: number;
}
