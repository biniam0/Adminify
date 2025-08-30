import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import { GuestHouseGrid } from "@/components/guest-house/GuestHouseGrid";

export default async function GuestHousePage() {
  const guestHouses = await getGuestHouses();

  return <GuestHouseGrid guestHouses={guestHouses} />;
}
