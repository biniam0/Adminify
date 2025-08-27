import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import GuestHouseTable from "@/components/guest-house/GuestHouseTable";

export default async function GuestHousePage() {
  const guestHouses = await getGuestHouses();

  return <GuestHouseTable guestHouses={guestHouses} />;
}
