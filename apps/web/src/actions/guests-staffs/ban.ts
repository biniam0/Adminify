import { apiClient } from "@/lib/api-client";

export async function ban({
  userId,
  banReason,
  banExpiresIn,
}: {
  userId: string;
  banReason: string;
  banExpiresIn?: string;
}) {
  try {
    await apiClient.post(`/api/admin/ban-guest`, {
      userId,
      banReason,
      banExpiresIn,
    });
  } catch (error) {
    console.error("Failed to ban guest:", error);
    return null;
  }
}
