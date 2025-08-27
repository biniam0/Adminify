import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";

export async function getGuestHouses(): Promise<[] | GuestHouseType[]> {
  try {
    const res = await apiClient.get("/api/get-guest-houses");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest houses:", error);
    return [];
  }
}
