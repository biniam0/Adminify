import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GuestHouseType } from "@/types/guest-room.type";
import { Car, Coffee, Mail, MapPin, Phone, Wifi } from "lucide-react";

export function GuestHouseCard({
  name,
  images,
  description,
  address,
  facilities,
  contact,
}: GuestHouseType) {
  return (
    <Card className="w-full rounded-2xl shadow-md overflow-hidden">
      <div className="flex flex-wrap justify-center gap-2 p-3">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={name}
            width={300}
            height={160}
            className="h-40 w-60 object-cover rounded-xl"
          />
        ))}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" /> {address}
        </div>

        <div className="flex flex-wrap gap-2">
          {facilities.includes("wifi") && (
            <Badge variant="outline">
              <Wifi className="h-3 w-3 mr-1" /> Wi-Fi
            </Badge>
          )}
          {facilities.includes("parking") && (
            <Badge variant="outline">
              <Car className="h-3 w-3 mr-1" /> Parking
            </Badge>
          )}
          {facilities.includes("breakfast") && (
            <Badge variant="outline">
              <Coffee className="h-3 w-3 mr-1" /> Breakfast
            </Badge>
          )}
        </div>

        <div className="space-y-1 text-sm">
          {contact?.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" /> {contact.phone}
            </div>
          )}
          {contact?.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" /> {contact.email}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
