import { apiClient } from "@/lib/api-client";
import type { GuestWithBookings } from "@/types/guest-room.type";

export async function getStaffs(): Promise<GuestWithBookings[]> {
  try {
    const res = await apiClient.get(`/api/get-staffs`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch staffs:", error);
    return [];
  }
}
