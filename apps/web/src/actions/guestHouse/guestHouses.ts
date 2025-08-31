"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";

export async function getGuestHouses(): Promise<GuestHouseType[] | []> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await apiClient.get("/api/get-guest-houses", {
      headers: { cookie: cookieString },
      withCredentials: true,
    });

    console.log("Fetched guest houses:", res.status, res.data.length, res.data);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest houses:", error);
    return [];
  }
}
