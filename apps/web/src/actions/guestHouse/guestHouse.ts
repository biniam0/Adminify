import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";
import { cookies } from "next/headers";

export async function getGuestHouse(
  guestHouseId: string
): Promise<GuestHouseType | null> {
  try {
    const cookieHeader = await cookies();
    const res = await apiClient.get(`/api/get-guest-house/${guestHouseId}`, {
      headers: { cookie: cookieHeader.toString() },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return null;
  }
}
