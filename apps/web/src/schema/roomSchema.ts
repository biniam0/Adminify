import * as z from "zod";

export const roomSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Name is required"),
  roomId: z.string().min(1, "Room ID is required"),
  type: z.enum([
    "SINGLE",
    "DOUBLE",
    "TWIN",
    "DELUXE",
    "SUITE",
    "FAMILY",
    "STUDIO",
    "EXECUTIVE",
    "PRESIDENTIAL",
  ]),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().min(5, "Description is required"),
  images: z
    .array(
      z.object({
        url: z.string().url("Invalid URL"),
        name: z.string().min(1, "Image name required"),
      })
    )
    .min(1, "At least one image is required"),
  availability: z.boolean(),
  square_meters: z.number().min(1, "Square meters required"),
  max_occupancy: z.number().min(1, "Max occupancy required"),
  beds: z.object({
    single_beds: z.number().min(0),
    double_beds: z.number().min(0),
    queen_beds: z.number().min(0),
    king_beds: z.number().min(0),
    sofa_beds: z.number().min(0),
    cribs: z.boolean(),
  }),
  living_features: z.object({
    private_bathroom: z.boolean().optional(),
    bathtub: z.boolean().optional(),
    shower: z.boolean().optional(),
    hairdryer: z.boolean().optional(),
    minibar: z.boolean().optional(),
    tv: z.boolean().optional(),
    streaming_tv: z.boolean().optional(),
    wifi_available: z.boolean().optional(),
  }),
  kitchen_features: z.object({
    coffee_maker: z.boolean().optional(),
    refrigerator: z.boolean().optional(),
    microwave: z.boolean().optional(),
  }),
  accessibility: z.object({
    wheelchair_accessible: z.boolean().optional(),
  }),
  hygiene_features: z.object({
    sanitizer: z.boolean().optional(),
    hygiene_kits: z.boolean().optional(),
    digital_keys: z.boolean().optional(),
  }),
  guestHouseId: z.string().nonempty("Guest house is required"),
});

export type RoomFormData = z.infer<typeof roomSchema>;
export type LivingFeatureKey = keyof RoomFormData["living_features"];
export type KitchenFeatureKey = keyof RoomFormData["kitchen_features"];
export type HygieneFeatureKey = keyof RoomFormData["hygiene_features"];
export type BedKey = keyof RoomFormData["beds"];
