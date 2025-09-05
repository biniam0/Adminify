import { getGuestHouse } from "@/actions/guestHouse/guestHouse";
import GuestHouseDetails from "@/components/guest-house/GuestHouseDetails";

export const dynamic = "force-dynamic";

const GuestHousePage = async ({
  params,
}: {
  params: Promise<{ guestHouseId: string }>;
}) => {
  const { guestHouseId } = await params;
  const guestHouse = await getGuestHouse(guestHouseId);
 

  if (!guestHouse) {
    return <p className="p-4 text-red-600">Guest House not found</p>;
  }

  return <GuestHouseDetails guestHouse={guestHouse} />
};

export default GuestHousePage;
