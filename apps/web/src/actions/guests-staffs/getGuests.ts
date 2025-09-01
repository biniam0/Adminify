import { apiClient } from "@/lib/api-client";
import type { GuestWithBookings } from "@/types/guest-room.type";

export async function getGuests(
): Promise<GuestWithBookings[]> {
  try {
    const res = await apiClient.get(`/api/get-guests`)
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guests:", error);
    return [];
  }
}
