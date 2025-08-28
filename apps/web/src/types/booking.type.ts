export interface PendingBook {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  checkIn: string;
  checkOut: string;
  guests: number;
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
}
