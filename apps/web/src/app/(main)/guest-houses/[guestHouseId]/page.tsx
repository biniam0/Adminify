import { getGuestHouse } from "@/actions/guestHouse/guestHouse";
import { GuestHouseDetail } from "@/components/guest-house/GuestHouseDetail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function GuestHousePage({
  params,
}: {
  params: Promise<{ guestHouseId: string }>;
}) {
  const { guestHouseId } = await params;
  const guestHouse = await getGuestHouse(guestHouseId);

  if (!guestHouse) {
    return <div className="p-4 text-red-500">Guest House not found</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-6 p-4">
      <GuestHouseDetail {...guestHouse} />
      <div className="flex justify-center gap-6 p-4">
        <Button>Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>

      {guestHouse.rooms && guestHouse.rooms.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Available Rooms</h2>
          <Card className="flex flex-col m-2 p-2 space-y-4 rounded-lg shadow-md gap-0">
            <Table className="min-w-full border rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Name</TableHead>
                  <TableHead className="text-left">Type</TableHead>
                  <TableHead className="text-left">Price</TableHead>
                  <TableHead className="text-left">Description</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {guestHouse.rooms.map((room) => (
                  <TableRow
                    key={room.id}
                    className="transition-colors cursor-pointer"
                  >
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>${room.price}</TableCell>
                    <TableCell>{room.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
    </div>
  );
}
