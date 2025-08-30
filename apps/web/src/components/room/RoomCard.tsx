import type { RoomType } from "@/types/guest-room.type";
import {
  Bath,
  Refrigerator,
  Ruler,
  ShowerHead,
  Wifi,
  Wine,
} from "lucide-react";
import { ImageSlider } from "../ImageSlider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RoomFeatureIcon } from "./RoomFeatureIcon";

export function RoomCard({
  room,
  onClick,
}: {
  room: RoomType;
  onClick: () => void;
}) {
  return (
    <Card className="hover:shadow-xl transition border rounded-lg overflow-hidden pt-0">
      <div className="w-full h-48">
        <ImageSlider images={room.images} />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{room.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {room.description.length > 25
            ? room.description.slice(0, 25) + "..."
            : room.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{room.type}</Badge>
          <span className="text-lg font-bold text-primary">
            ${room.price}/day
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <Ruler className="h-4 w-4 text-primary" />
          <span>
            {room.square_meters} m² • Max {room.max_occupancy} guests
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {room.living_features.bathtub && (
            <RoomFeatureIcon icon={Bath} label="Bathtub" />
          )}
          {room.living_features.shower && (
            <RoomFeatureIcon icon={ShowerHead} label="Shower" />
          )}
          {room.living_features.minibar && (
            <RoomFeatureIcon icon={Wine} label="Minibar" />
          )}
          {room.living_features.wifi_available && (
            <RoomFeatureIcon icon={Wifi} label="Wi-Fi" />
          )}
          {room.kitchen_features.refrigerator && (
            <RoomFeatureIcon icon={Refrigerator} label="Refrigerator" />
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button size="sm" className="text-base">
          Book Now
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          className="text-xs text-muted-foreground"
        >
          Details →
        </Button>
      </CardFooter>
    </Card>
  );
}
