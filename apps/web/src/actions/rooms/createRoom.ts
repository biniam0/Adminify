import { apiClient } from "@/lib/api-client";
import type { RoomFormData } from "@/schema/roomSchema";
import type { RoomType } from "@/types/guest-room.type";

export async function createRoom(
  values: RoomFormData
): Promise<RoomType | null> {
  try {
    const res = await apiClient.post(`/api/create-room`, values);
    return res.data;
  } catch (error) {
    console.error("Failed to create room:", error);
    return null;
  }
}
