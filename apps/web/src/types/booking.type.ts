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
