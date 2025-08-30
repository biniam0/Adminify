import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import { GuestHouseGrid } from "@/components/guest-house/GuestHouseGrid";

export const dynamic = "force-dynamic";

export default async function GuestHousePage() {
  const guestHouses = await getGuestHouses();

  return <GuestHouseGrid guestHouses={guestHouses} />;
}
