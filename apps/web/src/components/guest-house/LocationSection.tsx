import type { Contact, GuestHouseType } from "@/types/guest-room.type";
import { Card } from "../ui/card";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";

export const LocationSection = ({
  address,
  location,
  contact,
}: {
  address: string;
  location: GuestHouseType["location"];
  contact: Contact;
}) => {
  return (
    <div className="space-y-6">
      {/* Address */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">Address</h3>
        <div className="flex items-start gap-2 text-muted-foreground bg-muted p-4 rounded-lg">
          <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
          <p className="leading-relaxed">{address}</p>
        </div>
      </div>

      {/* Location & Contact Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location Card */}
        <Card className="p-4 border border-border shadow-sm bg-card text-card-foreground">
          <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            Location Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Continent:</span>
              <span className="font-medium">{location.continent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country:</span>
              <span className="font-medium">{location.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">City:</span>
              <span className="font-medium">{location.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Area:</span>
              <span className="font-medium">{location.subcity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nearby:</span>
              <span className="font-medium">{location.nearby}</span>
            </div>
          </div>
        </Card>

        {/* Contact Card */}
        <Card className="p-4 border border-border shadow-sm bg-card text-card-foreground">
          <h4 className="font-semibold mb-3 text-foreground">
            Contact Information
          </h4>
          <div className="space-y-3">
            {contact.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
