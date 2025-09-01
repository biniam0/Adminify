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
import { useAuth } from "@/hooks/useAuth";
import type { GuestWithBookings } from "@/types/guest-room.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function GuestsTable({
  guests,
}: {
  guests: GuestWithBookings[];
}) {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/signin");
    }
  }, [session, isLoading, router]);

  if (!guests || guests.length === 0) {
    return <p className="p-4 text-red-600">No guests found!</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Guests</h2>
      <Card className="flex flex-col m-2 p-2 space-y-4 rounded-lg shadow-md gap-0">
        <Table className="min-w-full border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Banned</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Latest Booking</TableHead>
              <TableHead>Ban</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => {
              const latestBooking = guest.bookings[guest.bookings.length - 1];
              return (
                <TableRow key={guest.id} className="transition-colors">
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>
                    {guest.banned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>{guest.bookings.length}</TableCell>
                  <TableCell>
                    {latestBooking
                      ? `${new Date(
                          latestBooking.checkIn
                        ).toLocaleDateString()} → ${new Date(
                          latestBooking.checkOut
                        ).toLocaleDateString()}`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {guest.role ? (
                      <Button variant="outline">Ban</Button>
                    ) : (
                      <Button variant="outline">Permit</Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
