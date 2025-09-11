import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";

export async function createGuestHouse(
  values: GuestHouseType
): Promise<GuestHouseType | null> {
  try {
    const res = await apiClient.post(`/api/create-guest-house`, values);
    return res.data;
  } catch (error) {
    console.error("Failed to create guest house:", error);
    return null;
  }
}
