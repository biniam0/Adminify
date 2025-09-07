"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RoomType } from "@/types/guest-room.type";
import {
  Tv,
  ShowerHead,
  Bath,
  Coffee,
  Wifi,
  Accessibility,
  Fan,
  Martini,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { ImageGallery } from "../guest-house/ImageGallery";
import { useState } from "react";
import { BookRoomPage } from "./BookRoomPage";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { Session } from "@/lib/auth-client";
import { deleteRoom } from "@/actions/rooms/deleteRoom";

interface RoomCardProps {
  room: RoomType;
}

export function RoomDetail({ room }: RoomCardProps) {
  const {
    name,
    type,
    price,
    description,
    images,
    availability,
    square_meters,
    max_occupancy,
    beds,
    living_features,
    kitchen_features,
    accessibility,
    hygiene_features,
  } = room;
  const [modalOpen, setModalOpen] = useState(false);
  const { session } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRoomDelete = async (roomId: string, session: Session) => {
    try {
      setIsDeleting(true);
      const deleted = await deleteRoom(roomId, session.user);

      toast.success("Room deleted successfully!");
      router.push("/rooms");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("An error occurred while deleting. Please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="w-full rounded-2xl border-none shadow-sm overflow-hidden mt-4 px-10">
        <ImageGallery images={images} />

        {session?.user.role === "ADMIN" && (
          <div className="flex justify-center gap-4 mb-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 border-0"
              onClick={() => {
                setIsEditing(true);
                toast.message("Coming soon!");
                setTimeout(() => setIsEditing(false), 1000);
              }}
              disabled={isEditing || isDeleting} // disable while loading
            >
              {isEditing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Edit className="h-4 w-4 mr-2" />
              )}
              Edit Room
            </Button>

            <Button
              variant="destructive"
              className="px-6 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => session && handleRoomDelete(room.id, session)}
              disabled={isDeleting || isEditing} // disable while loading
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete Room
            </Button>
          </div>
        )}

        <CardHeader className="px-6 pt-4">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <Badge>{type}</Badge>
          <p className="font-semibold text-lg mt-1">${price} / night</p>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-6">
          <div>
            {availability ? (
              <Badge className="bg-yellow-300">Available</Badge>
            ) : (
              <Badge className="bg-green-600">Occupied</Badge>
            )}
          </div>

          <Card className="flex flex-col w-fit border-pr bg-chart-3/20 rounded-sm py-0 p-2 gap-2 text-sm">
            <p>
              <span className="font-medium">Size:</span> {square_meters} m²
            </p>
            <p>
              <span className="font-medium">Max Occupancy:</span>{" "}
              {max_occupancy} {max_occupancy > 1 ? "people" : "person"}
            </p>
          </Card>

          <div className="flex flex-wrap gap-2">
            {beds.single_beds > 0 && (
              <Badge>Single Bed x{beds.single_beds}</Badge>
            )}
            {beds.double_beds > 0 && (
              <Badge>Double Bed x{beds.double_beds}</Badge>
            )}
            {beds.queen_beds > 0 && <Badge>Queen Bed x{beds.queen_beds}</Badge>}
            {beds.king_beds > 0 && <Badge>King Bed x{beds.king_beds}</Badge>}
            {beds.sofa_beds > 0 && <Badge>Sofa Bed x{beds.sofa_beds}</Badge>}
            {beds.cribs && <Badge>Crib Available</Badge>}
          </div>

          <div className="flex flex-wrap gap-2">
            {living_features.tv && (
              <Badge>
                <Tv className="w-4 h-4 mr-1 inline" /> TV
              </Badge>
            )}
            {living_features.shower && (
              <Badge>
                <ShowerHead className="w-4 h-4 mr-1 inline" /> Shower
              </Badge>
            )}
            {living_features.bathtub && (
              <Badge>
                <Bath className="w-4 h-4 mr-1 inline" /> Bathtub
              </Badge>
            )}
            {living_features.minibar && (
              <Badge>
                <Martini className="w-4 h-4 mr-1 inline" /> Minibar
              </Badge>
            )}
            {living_features.hairdryer && (
              <Badge>
                <Fan className="w-4 h-4 mr-1 inline" /> Hairdryer
              </Badge>
            )}
            {living_features.streaming_tv && <Badge>Streaming TV</Badge>}
            {living_features.wifi_available && (
              <Badge>
                <Wifi className="w-4 h-4 mr-1 inline" /> Wi-Fi
              </Badge>
            )}
            {living_features.private_bathroom && (
              <Badge>Private Bathroom</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {kitchen_features.coffee_maker && (
              <Badge>
                <Coffee className="w-4 h-4 mr-1 inline" /> Coffee Maker
              </Badge>
            )}
            {kitchen_features.microwave && <Badge>Microwave</Badge>}
            {kitchen_features.refrigerator && <Badge>Refrigerator</Badge>}
          </div>

          {accessibility.wheelchair_accessible && (
            <Badge>
              <Accessibility className="w-4 h-4 mr-1 inline" /> Wheelchair
              Accessible
            </Badge>
          )}

          <div className="flex flex-wrap gap-2">
            {hygiene_features.sanitizer && <Badge>Sanitizer</Badge>}
            {hygiene_features.digital_keys && <Badge>Digital Keys</Badge>}
            {hygiene_features.hygiene_kits && <Badge>Hygiene Kits</Badge>}
          </div>

          <Button
            className="flex w-fit mx-auto mt-2"
            variant={availability ? "default" : "outline"}
            disabled={!availability}
            onClick={() => setModalOpen(true)}
          >
            Own It Now!
          </Button>
        </CardContent>
      </Card>
      <BookRoomPage open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
