"use server";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type { GuestHouseType } from "@/types/guest-room.type";

export async function getGuestHouses(): Promise<GuestHouseType[] | []> {
  try {
    const cookieHeader = await cookies();
    const res = await apiClient.get("/api/get-guest-houses", {
      headers: { cookie: cookieHeader.toString() },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch guest houses:", error);
    return [];
  }
}
