import * as z from "zod";

export const guestHouseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  type: z.enum(["SHARED", "PRIVATE"]),
  images: z.array(
    z.object({
      url: z.string().url("Invalid URL"),
      name: z.string().min(1, "Image name required"),
    })
  ),
  about: z
    .object({
      description: z.string().min(5, "Description required"),
    })
    .optional(),
  feedbacks: z
    .array(
      z.object({
        message: z.string().min(1),
        rating: z.number().min(1).max(5),
      })
    )
    .optional(),
  location: z
    .object({
      continent: z.string().min(2),
      country: z.string().min(2),
      city: z.string().min(2),
      subcity: z.string().min(2),
      nearby: z.string().optional(),
    })
    .optional(),
  facilities: z.array(z.string()),
  contact: z.object({
    phone: z.string().min(7),
    email: z.string().email(),
  }),
  createdAt: z.date().optional(),
});

export type GuestHouseFormData = z.infer<typeof guestHouseSchema>;
