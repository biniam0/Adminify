"use server";

import { apiClient } from "@/lib/api-client";
import type { ActionType } from "@/types/booking.type";

export async function getActivity(): Promise<ActionType[] | []> {
  try {
    const res = await apiClient.get(`/api/analytic/activities`);
    return res.data;
  } catch (error) {
    console.error("Failed to get activities:", error);
    return [];
  }
}
