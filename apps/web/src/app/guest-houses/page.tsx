"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GuestHouseType } from "@/types/guest";
import { useRouter } from "next/navigation";
import { dummyGuestHouses } from "./dummyData";


export default function GuestHouseDisplay({
  guestHouses = dummyGuestHouses,
}: {
  guestHouses?: GuestHouseType[];
}) {
  const router = useRouter();

  return (
    <>
      <h1 className="text-2xl font-bold pl-2">Browse Guest Houses</h1>
      <Card className="flex flex-col m-2 p-2 space-y-4 rounded-lg shadow-md gap-0">
        <Table className="min-w-full border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Address</TableHead>
              <TableHead className="text-left">Facilities</TableHead>
              <TableHead className="text-left">Contact</TableHead>
              <TableHead className="text-left">Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {guestHouses.map((guest) => (
              <TableRow
                key={guest.id}
                className="transition-colors cursor-pointer"
                onClick={() => router.push(`/guest-houses/${guest.id}`)}
              >
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>{guest.address}</TableCell>
                <TableCell>{guest.facilities.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>📞 {guest.contact.phone}</span>
                    <span>✉️ {guest.contact.email}</span>
                  </div>
                </TableCell>
                <TableCell>{guest.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
