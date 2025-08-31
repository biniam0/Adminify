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
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await apiClient.post("/api/create-booking", data, {
      headers: { cookie: cookieString },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    return null;
  }
}
