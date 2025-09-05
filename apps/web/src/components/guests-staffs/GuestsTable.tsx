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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ban } from "@/actions/guests-staffs/ban";
import { unBan } from "@/actions/guests-staffs/unBan";
import { toast } from "sonner";

export default function GuestsTable({
  guests,
}: {
  guests: GuestWithBookings[];
}) {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  const handleBan = async (userId: string, banReason: string) => {
    try {
      await ban({ userId, banReason });
      toast.success("Guest banned successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Error while banning guest:", error);
      toast.error(error?.message || "Failed to ban guest");
    }
  };
  const handleUnBan = async (userId: string) => {
    try {
      await unBan({ userId });
      toast.success("Guest unbanned successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Error while unbanning guest:", error);
      toast.error(error?.message || "Failed to unban guest");
    }
  };

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
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Banned</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Latest Booking</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => {
              const latestBooking = guest.bookings[guest.bookings.length - 1];
              return (
                <TableRow key={guest.id} className="transition-colors">
                  <TableCell>
                    {guest.image ? (
                      <Image
                        src={guest.image}
                        alt={guest.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        {guest.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>
                    {guest.emailVerified ? (
                      <Badge variant="outline" className="flex mx-auto">
                        <IconCheck className="text-green-500" size={28} />
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex mx-auto">
                        <IconX className="mx-auto text-red-500" size={28} />
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{guest.role}</Badge>
                  </TableCell>
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
                      : "No Booking"}
                  </TableCell>
                  <TableCell>
                    {new Date(guest.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {guest.banned ? (
                      <Button
                        variant="outline"
                        onClick={() => session && handleUnBan(guest.id)}
                      >
                        Unban
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        onClick={() =>
                          session && handleBan(guest.id, "Spamming")
                        }
                      >
                        Ban
                      </Button>
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
