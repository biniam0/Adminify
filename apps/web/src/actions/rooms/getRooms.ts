import { apiClient } from "@/lib/api-client";
import type { RoomType } from "@/types/guest-room.type";

export async function getRooms(): Promise<RoomType[] | []> {
  try {
    const res = await apiClient.get(`/api/get-rooms`);

    console.log("Fetched rooms:", res.status, res.data.length, res.data);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return [];
  }
}
