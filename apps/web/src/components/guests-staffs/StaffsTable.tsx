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
import Image from "next/image";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function StaffsTable({
  staffs,
}: {
  staffs: GuestWithBookings[];
}) {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/signin");
    }
  }, [session, isLoading, router]);

  if (!staffs || staffs.length === 0) {
    return <p className="p-4 text-red-600">No staffs found!</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Staffs</h2>
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
            {staffs.map((staff) => {
              const latestBooking = staff.bookings[staff.bookings.length - 1];
              return (
                <TableRow key={staff.id} className="transition-colors">
                  <TableCell>
                    {staff.image ? (
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        {staff.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    {staff.emailVerified ? (
                      <IconCheck className="text-green-500" size={18} />
                    ) : (
                      <IconX className="text-red-500" size={18} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{staff.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {staff.banned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </TableCell>

                  <TableCell>{staff.bookings.length}</TableCell>
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
                    {new Date(staff.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {staff.banned ? (
                      <Button variant="outline">Unban</Button>
                    ) : (
                      <Button variant="destructive">Ban</Button>
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
