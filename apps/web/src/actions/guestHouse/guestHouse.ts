import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";
import { cookies } from "next/headers";

export async function getGuestHouse(
  guestHouseId: string
): Promise<GuestHouseType | null> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const res = await apiClient.get(`/api/get-guest-house/${guestHouseId}`, {
      headers: { cookie: cookieString },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return null;
  }
}
