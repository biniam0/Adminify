import { apiClient } from "@/lib/api-client";

export async function unBanGuest({
  userId,
}: {
  userId: string;
}) {
  try {
    await apiClient.post(`/api/admin/unban-guest`, {
      userId,
    });
  } catch (error) {
    console.error("Failed to unban guest:", error);
    return null;
  }
}
