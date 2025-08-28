"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { PendingBook } from "@/types/booking.type";
import { approvePendingBook } from "@/actions/booking/approvePending";

export default function PendingBookTable({
  pendingBooks,
}: {
  pendingBooks: PendingBook[];
}) {
  const router = useRouter();

  if (!pendingBooks || pendingBooks.length === 0) {
    return <p className="p-4 text-red-600">No pending bookings available!</p>;
  }

  async function handleApproval(id: string, approve: boolean) {
    try {
      const res = await approvePendingBook(id, approve);

      toast.success(
        approve ? "Booking approved successfully" : "Booking rejected"
      );

      router.refresh();
    } catch (error: any) {
      console.error("Error approving/rejecting booking:", error);
      toast.error(error?.response?.data?.error || "Something went wrong!");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
      <Card className="flex flex-col m-2 p-2 space-y-4 rounded-lg shadow-md gap-0">
        <Table className="min-w-full border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Guest Name</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingBooks.map((booking) => (
              <TableRow key={booking.id} className="transition-colors">
                <TableCell>{booking.user?.name ?? "Unknown"}</TableCell>
                <TableCell>
                  <Badge variant="outline">{booking.room?.roomId}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(booking.checkIn).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.checkOut).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{booking.status}</Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleApproval(booking.id, true)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleApproval(booking.id, false)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
