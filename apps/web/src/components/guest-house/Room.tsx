import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  type: string;
  price: string;
  image: string;
  amenities: string[];
  facilities: string[];
  available: boolean;
}

export function RoomCard({
  type,
  price,
  image,
  amenities = [],
  available,
}: Props) {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md overflow-hidden">
      <img src={image} alt={type} className="h-40 w-full object-cover" />

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{type}</CardTitle>
        <p className="text-gray-600">${price} / night</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {amenities.map((a, idx) => (
            <Badge key={idx} variant="secondary">
              {a}
            </Badge>
          ))}
        </div>

        <div className="text-sm font-medium">
          {available ? (
            <span className="text-green-600">Available</span>
          ) : (
            <span className="text-red-600">Not Available</span>
          )}
        </div>

        <Button className="w-full" disabled={!available}>
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
