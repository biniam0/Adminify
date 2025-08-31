import { apiClient } from "@/lib/api-client";
import type { RoomType } from "@/types/guest-room.type";
import { cookies } from "next/headers";

export async function getRooms(): Promise<RoomType[] | []> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const res = await apiClient.get(`/api/get-rooms`, {
      headers: { cookie: cookieString },
      withCredentials: true,
    });

    console.log("Fetched rooms:", res.status, res.data.length, res.data);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest house:", error);
    return [];
  }
}
