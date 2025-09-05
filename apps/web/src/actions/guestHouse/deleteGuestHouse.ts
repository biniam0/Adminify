import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/auth-client";
import type { GuestHouseType } from "@/types/guest-room.type";

export async function deleteGuestHouse(
  guestHouseId: string,
  user: User
): Promise<GuestHouseType | null> {
  try {
    const res = await apiClient.delete(
      `/api/delete-guest-house/${guestHouseId}`,
      { data: { user } }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to delete guest house:", error);
    return null;
  }
}
