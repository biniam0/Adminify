import { apiClient } from "@/lib/api-client";
import type { RoomType } from "@/types/guest-room.type";
import { cookies } from "next/headers";

export async function getRoom(roomId: string): Promise<RoomType | null> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await apiClient.get(`/api/get-room/${roomId}`, {
      headers: { cookie: cookieString },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return null;
  }
}
