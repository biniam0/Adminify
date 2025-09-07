import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/auth-client";
import type { RoomType } from "@/types/guest-room.type";

export async function deleteRoom(
  roomId: string,
  user: User
): Promise<RoomType | null> {
  try {
    const res = await apiClient.delete(
      `/api/delete-room/${roomId}`,
      { data: { user } }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to delete room:", error);
    return null;
  }
}
