import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";

export async function getGuestHouse(
  guestHouseId: string
): Promise<GuestHouseType | null> {
  try {
    const res = await apiClient.get(`/api/get-guest-house/${guestHouseId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return null;
  }
}
