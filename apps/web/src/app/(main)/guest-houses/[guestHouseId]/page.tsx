import { getGuestHouse } from "@/actions/guestHouse/guestHouse";
import { AboutSection } from "@/components/guest-house/AboutSection";
import { ImageGallery } from "@/components/guest-house/ImageGallery";
import { LocationSection } from "@/components/guest-house/LocationSection";
import { ReviewsSection } from "@/components/guest-house/ReviewsSection";
import { RoomsSection } from "@/components/guest-house/RoomsSection";
import { StarRating } from "@/components/guest-house/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const GuestHousePage = async ({
  params,
}: {
  params: Promise<{ guestHouseId: string }>;
}) => {
  const { guestHouseId } = await params;
  const guestHouse = await getGuestHouse(guestHouseId);

  if (!guestHouse) {
    return <p className="p-4 text-red-600">Guest House not found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 mb-2 border-primary/20"
            >
              {guestHouse.type} Guest House
            </Badge>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              {guestHouse.name}
            </h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <StarRating
                  rating={Math.round(guestHouse.about.review.averageRating)}
                />
                <span className="font-medium text-foreground">
                  {guestHouse.about.review.averageRating.toFixed(1)}
                </span>
              </div>
              <span>•</span>
              <span>{guestHouse.about.review.totalReviewers} reviews</span>
            </div>
          </div>
          <ImageGallery images={guestHouse.images} />
        </div>

        <div className="flex justify-center gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 border-0">
            <Edit className="h-4 w-4 mr-2" />
            Edit Guest House
          </Button>
          <Button
            variant="destructive"
            className="px-6 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Guest House
          </Button>
        </div>

        <Card className="overflow-hidden border-none bg-card shadow-xl p-0">
          <Tabs defaultValue="about" className="w-full">
            <div className="border-none bg-card">
              <TabsList className="grid w-full grid-cols-4 h-14 bg-transparent p-0 rounded-none">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="rooms"
                  className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm"
                >
                  Rooms
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm"
                >
                  Location
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 bg-card">
              <TabsContent value="about" className="mt-0">
                <AboutSection
                  about={guestHouse.about}
                  facilities={guestHouse.facilities}
                />
              </TabsContent>

              <TabsContent value="rooms" className="mt-0">
                <RoomsSection rooms={guestHouse.rooms} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <ReviewsSection feedback={guestHouse.feedback} />
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <LocationSection
                  address={guestHouse.address}
                  location={guestHouse.location}
                  contact={guestHouse.contact}
                />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default GuestHousePage;
