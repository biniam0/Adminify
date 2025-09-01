"use server";

import { apiClient } from "@/lib/api-client";

export async function getPendingBooking() {
  try {
    const res = await apiClient.get("/api/get-pending-books");
    return res.data;
  } catch (error) {
    console.error("Failed to while retrieving pending bookings:", error);
    return null;
  }
}
