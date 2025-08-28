import { apiClient } from "@/lib/api-client";
import type { RoomType } from "@/types/guest-room.type";
import { cookies } from "next/headers";

export async function getRooms(): Promise<RoomType[] | []> {
  try {
    const cookieHeader = await cookies();
    const res = await apiClient.get(`/api/get-rooms`, {
      headers: { cookie: cookieHeader.toString() },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return [];
  }
}
