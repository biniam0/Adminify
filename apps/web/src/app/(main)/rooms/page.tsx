import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { dummyGuestHouses } from "../guest-houses/dummyData";
import { Card } from "@/components/ui/card";

type RoomRow = {
  id: number;
  roomName: string;
  roomType: string;
  price: number;
  description: string;
  guestHouseName: string;
};

const rooms: RoomRow[] = dummyGuestHouses.flatMap(
  (guest) =>
    guest.rooms?.map((room) => ({
      id: room.id,
      roomName: room.name,
      roomType: room.type,
      price: room.price,
      description: room.description,
      guestHouseName: guest.name,
    })) || []
);

export default function RoomsTable() {
  return (
    <div className="p-4">
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
                key={`${room.guestHouseName}-${room.id}`}
                className="transition-colors cursor-pointer"
              >
                <TableCell>{room.roomName}</TableCell>
                <TableCell className="font-medium">
                  {room.guestHouseName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{room.roomType}</Badge>
                </TableCell>
                <TableCell>${room.price}</TableCell>
                <TableCell>{room.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
