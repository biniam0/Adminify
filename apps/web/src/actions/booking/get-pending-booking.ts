"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function getPendingBooking() {
  try {
    const cookieHeader = await cookies();

    const res = await apiClient.get("/api/get-pending-books", {
      headers: { cookie: cookieHeader.toString() },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to while retrieving pending bookings:", error);
    return null;
  }
}
