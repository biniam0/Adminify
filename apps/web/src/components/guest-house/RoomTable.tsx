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
import type { RoomType } from "@/types/guest-room.type";
import { useRouter } from "next/navigation";

interface RoomsTableProps {
  rooms: RoomType[];
}

export default function RoomsTable({ rooms }: RoomsTableProps) {
  const router = useRouter();

  if (!rooms) {
    return <p className="p-4 text-red-600">No room available, yet!</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">All Rooms</h2>
      <Card className="flex flex-col m-2 p-2 space-y-4 rounded-lg shadow-md gap-0">
        <Table className="min-w-full border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Room Name</TableHead>
              <TableHead>Guest House</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={`${room.guestHouseId}-${room.id}`}
                className="transition-colors cursor-pointer"
                onClick={() => router.push(`/rooms/${room.id}`)}
              >
                <TableCell>{room.name}</TableCell>
                <TableCell className="font-medium">
                  {room.guestHouseId}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{room.type}</Badge>
                </TableCell>
                <TableCell>${room.price}</TableCell>
                <TableCell>{room.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
