"use server";

import { apiClient } from "@/lib/api-client";
import type { User } from "@/lib/auth-client";

export async function approvePendingBook(
  user: User,
  pendingBookId: string,
  approve: boolean
) {
  try {
    const status = approve ? "APPROVED" : "REJECTED"

    const res = await apiClient.patch(
      `/api/get-pending-books/${pendingBookId}`,
      { status, user },
    );
    return res.data;
  } catch (error) {
    console.error("Failed to approve booking:", error);
    return null;
  }
}
