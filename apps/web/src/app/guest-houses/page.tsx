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

const dummyGuestHouses: GuestHouseType[] = [
  {
    id: 1,
    name: "Sunset Guest House",
    images: ["Sunset Guest House"],
    description: "Cozy stay with sea view and great breakfast.",
    address: "123 Beach Road, Addis Ababa",
    facilities: ["Wi-Fi", "Parking", "Breakfast"],
    contact: { phone: "+251-912345678", email: "sunset@guest.com" },
  },
  {
    id: 2,
    name: "Highland Lodge",
    images: ["Highland Lodge"],
    description: "Mountain view lodge with deluxe rooms.",
    address: "456 Hilltop, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-934567890", email: "highland@guest.com" },
  },
  {
    id: 3,
    name: "Mountain View Inn",
    images: ["Mountain View Inn"],
    description: "Deluxe mountain lodge with modern amenities.",
    address: "789 Summit St, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-945678901", email: "mountain@guest.com" },
  },
  {
    id: 4,
    name: "Highland Lodge",
    images: ["Highland Lodge"],
    description: "Mountain view lodge with deluxe rooms.",
    address: "456 Hilltop, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-934567890", email: "highland@guest.com" },
  },
  {
    id: 5,
    name: "Mountain View Inn",
    images: ["Mountain View Inn"],
    description: "Deluxe mountain lodge with modern amenities.",
    address: "789 Summit St, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-945678901", email: "mountain@guest.com" },
  },
  {
    id: 6,
    name: "Highland Lodge",
    images: ["Highland Lodge"],
    description: "Mountain view lodge with deluxe rooms.",
    address: "456 Hilltop, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-934567890", email: "highland@guest.com" },
  },
  {
    id: 7,
    name: "Mountain View Inn",
    images: ["Mountain View Inn"],
    description: "Deluxe mountain lodge with modern amenities.",
    address: "789 Summit St, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-945678901", email: "mountain@guest.com" },
  },
];

export default function GuestHouseDisplay({
  guestHouses = dummyGuestHouses,
}: {
  guestHouses?: GuestHouseType[];
}) {
  return (
    <Card className="flex flex-col m-2 p-2 space-y-4 rounded-lg shadow-md gap-0">
      <h1 className="text-2xl font-bold">Browse Guest Houses</h1>

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
              className="transition-colors"
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
  );
}
