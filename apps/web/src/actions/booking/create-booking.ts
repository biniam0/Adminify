"use server";

import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/auth-client";
import { cookies } from "next/headers";

export async function createBooking(
  user: User,
  data: {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }
) {
  try {
    const res = await apiClient.post("/api/create-booking", data, );
    return res.data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    return null;
  }
}
