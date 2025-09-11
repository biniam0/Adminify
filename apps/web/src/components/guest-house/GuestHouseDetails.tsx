"use client";

import { deleteGuestHouse } from "@/actions/guestHouse/deleteGuestHouse";
import { AboutSection } from "@/components/guest-house/AboutSection";
import { ImageGallery } from "@/components/guest-house/ImageGallery";
import { LocationSection } from "@/components/guest-house/LocationSection";
import { ReviewsSection } from "@/components/guest-house/ReviewsSection";
import { RoomsSection } from "@/components/guest-house/RoomsSection";
import { StarRating } from "@/components/guest-house/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import type { Session } from "@/lib/auth-client";
import type { GuestHouseType } from "@/types/guest-room.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface GuestHouseDetailsProps {
  guestHouse: GuestHouseType;
}

const GuestHouseDetails = ({ guestHouse }: GuestHouseDetailsProps) => {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleGuestHouseDelete = async (guestHouseId: string, session: Session) => {
    setIsDeleting(true);
    try {
      const deleted = await deleteGuestHouse(guestHouseId, session.user);

      if (!deleted) {
        toast.error("Failed to delete guest house. Please try again.");
        setIsDeleting(false);
        return;
      }

      toast.success("Guest house deleted successfully!");
      router.push("/guest-houses");
    } catch (error) {
      console.error("Error deleting guest house:", error);
      toast.error("An error occurred while deleting. Please try again later.");
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/signin");
    }
  }, [isLoading, session, router]);

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
                <StarRating rating={Math.round(guestHouse.about?.review?.averageRating ?? 0)} />
                <span className="font-medium text-foreground">
                  {guestHouse.about?.review?.averageRating?.toFixed(1) ?? 0}
                </span>
              </div>
              <span>•</span>
              <span>{guestHouse.about?.review?.totalReviewers ?? 0} reviews</span>
            </div>
          </div>
          <ImageGallery images={guestHouse.images} />
        </div>

        {session?.user.role === "ADMIN" && (
          <div className="flex justify-center gap-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 border-0"
              disabled={isEditing}
              onClick={() => {
                setIsEditing(true);
                toast.message("Coming soon!");
                setTimeout(() => setIsEditing(false), 1000); // simulate loading
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Loading..." : "Edit Guest House"}
            </Button>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="px-6 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete Guest House"}
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this guest house? <br />
                    <span className="font-semibold">
                      All associated Rooms and Bookings will also be deleted!
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (guestHouse.id && session) {
                        handleGuestHouseDelete(guestHouse.id, session);
                        setDeleteDialogOpen(false);
                      } else {
                        toast.error("Guest house ID not found.");
                      }
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <Card className="overflow-hidden border-none bg-card shadow-xl p-0">
          <Tabs defaultValue="about" className="w-full">
            <div className="border-none bg-card">
              <TabsList className="grid w-full grid-cols-4 h-14 bg-transparent p-0 rounded-none">
                <TabsTrigger value="about" className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm">About</TabsTrigger>
                <TabsTrigger value="rooms" className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm">Rooms</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm">Reviews</TabsTrigger>
                <TabsTrigger value="location" className="data-[state=active]:bg-primary/20 m-1.5 rounded-sm">Location</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8 bg-card">
              <TabsContent value="about" className="mt-0">
                <AboutSection
                  about={guestHouse.about ?? { description: "", review: { averageRating: 0, totalReviewers: 0 } }}
                  facilities={guestHouse.facilities}
                />
              </TabsContent>

              <TabsContent value="rooms" className="mt-0">
                <RoomsSection rooms={guestHouse.rooms} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <ReviewsSection feedback={guestHouse.feedback ?? []} />
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

export default GuestHouseDetails;
