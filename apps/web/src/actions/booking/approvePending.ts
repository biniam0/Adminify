"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export async function approvePendingBook(
  pendingBookId: string,
  approve: boolean
) {
  try {
    const cookieHeader = await cookies();
    const status = approve ? "APPROVED" : "REJECTED";

    const res = await apiClient.patch(
      `/api/get-pending-books/${pendingBookId}`,
      { status },
      {
        headers: { cookie: cookieHeader.toString() },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to create booking:", error);
    return null;
  }
}
