"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoomType } from "@/types/guest-room.type";

interface RoomCardProps {
  room: RoomType;
}

export function RoomCard({ room }: RoomCardProps) {
  const { name, type, price, images, amenities, availability } = room;

  return (
    <Card className="w-full rounded-2xl shadow-lg overflow-hidden mt-0">
      <div className="flex flex-wrap justify-center gap-2 p-3">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${name} image ${idx + 1}`}
            className="h-40 w-fit object-cover rounded-md"
          />
        ))}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <p>{type}</p>
        <p className="font-semibold mt-1">${price} / night</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, idx) => (
            <Badge key={idx} variant="secondary">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="text-sm font-medium">
          {availability ? (
            <span className="text-green-600">Available</span>
          ) : (
            <span className="text-red-600">Not Available</span>
          )}
        </div>

        <Button className="w-full" disabled={!availability}>
          Own It Now!
        </Button>
      </CardContent>
    </Card>
  );
}
