import type { RoomType } from "@/types/guest-room.type";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export const RoomsSection = ({ rooms }: { rooms?: RoomType[] }) => {
  const router = useRouter();
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground/60 mb-2">
          <svg
            className="w-12 h-12 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" />
          </svg>
        </div>
        <p className="text-muted-foreground">
          No rooms available at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Available Rooms</h3>
      <Card className="overflow-hidden border rounded-md shadow-lg bg-card p-0">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-semibold text-foreground">
                Room Name
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Type
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Price
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room.id}
                className="hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0"
                onClick={() => router.push(`/rooms/${room.id}`)}
              >
                <TableCell className="font-medium text-foreground">
                  {room.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-sm border-border text-muted-foreground"
                  >
                    {room.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  ${room.price}/night
                </TableCell>
                <TableCell className="text-muted-foreground max-w-xs">
                  <p className="truncate">{room.description}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
