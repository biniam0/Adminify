import { apiClient } from "@/lib/api-client";
import type { RoomType } from "@/types/guest-room.type";

export async function getRoom(
  roomId: string
): Promise<RoomType | null> {
  try {
    const res = await apiClient.get(`/api/get-room/${roomId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return null;
  }
}
