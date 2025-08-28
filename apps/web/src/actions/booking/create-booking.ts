"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function createBooking(data: {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  try {
    const cookieHeader = await cookies();

    const res = await apiClient.post("/api/create-booking", data, {
      headers: { cookie: cookieHeader.toString() },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    return null;
  }
}
