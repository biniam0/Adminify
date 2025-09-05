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
import Image from "next/image";
import {
  Tv,
  ShowerHead,
  Bath,
  Coffee,
  Wifi,
  Accessibility,
  Fan,
  Martini,
} from "lucide-react";
import { ImageGallery } from "../guest-house/ImageGallery";
import { useState } from "react";
import { BookRoomPage } from "./BookRoomPage";

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

  return (
    <>
      <Card className="w-full rounded-2xl border-none shadow-sm overflow-hidden mt-4 px-10">
        <ImageGallery images={images} />

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
