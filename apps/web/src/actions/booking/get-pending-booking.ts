"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function getPendingBooking() {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await apiClient.get("/api/get-pending-books", {
      headers: { cookie: cookieString },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to while retrieving pending bookings:", error);
    return null;
  }
}
