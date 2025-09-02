import { Car, Coffee, Wifi } from "lucide-react";
import { Badge } from "../ui/badge";

export const FacilityBadge = ({ facility }: { facility: string }) => {
  const facilityConfig: Record<
    string,
    { icon: React.ReactNode; label: string }
  > = {
    wifi: { icon: <Wifi className="h-3 w-3 mr-1" />, label: "Wi-Fi" },
    parking: { icon: <Car className="h-3 w-3 mr-1" />, label: "Parking" },
    breakfast: {
      icon: <Coffee className="h-3 w-3 mr-1" />,
      label: "Breakfast",
    },
  };

  const config = facilityConfig[facility.toLowerCase()];
  if (!config) return null;

  return (
    <Badge
      variant="secondary"
      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};
