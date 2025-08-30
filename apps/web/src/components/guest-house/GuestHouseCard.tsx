// GuestHouseCard.tsx
import { MapPinned, MapPin, Star } from "lucide-react";
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
import { useRouter } from "next/navigation";
import type { GuestHouseType } from "@/types/guest-room.type";

export function GuestHouseCard({ guestHouse }: { guestHouse: GuestHouseType }) {
  const router = useRouter();

  return (
    <Card className="w-full max-w-none h-full hover:shadow-xl transition-shadow duration-200 border rounded-lg overflow-hidden flex flex-col p-0">
      {guestHouse.images.length > 0 && (
        <div className="w-full h-48 sm:h-52 md:h-48 lg:h-52 flex-shrink-0 p-2">
          <ImageSlider images={guestHouse.images} />
        </div>
      )}

      <div className="flex flex-col flex-grow p-3">
        <CardHeader className="flex-shrink-0 pb-3 px-0 pt-0">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            <div className="flex justify-between items-center w-full">
              <span className="truncate">{guestHouse.name}</span>
              <Badge>{guestHouse.type}</Badge>
            </div>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {guestHouse.about.description }
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow pb-3 px-0">
          <div className="flex flex-col gap-2 mb-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{guestHouse.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPinned className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">
                {guestHouse.location.city}, {guestHouse.location.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
              <span className="line-clamp-1">
                {guestHouse.about.review.averageRating} (
                {guestHouse.about.review.totalReviewers} reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {guestHouse.facilities.slice(0, 3).map((facility) => (
              <Badge
                key={facility}
                variant="outline"
                className="text-xs px-2 py-1"
              >
                {facility}
              </Badge>
            ))}
            {guestHouse.facilities.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{guestHouse.facilities.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">📞</span>
              <span className="line-clamp-1">{guestHouse.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex-shrink-0">✉️</span>
              <span className="line-clamp-1">{guestHouse.contact.email}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-shrink-0 pt-0 px-0 pb-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/guest-houses/${guestHouse.id}`)}
            className="w-full"
          >
            Details →
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
