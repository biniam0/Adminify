import { getGuests } from "@/actions/guests-staffs/getGuests";
import GuestsTable from "@/components/guests-staffs/GuestsTable";

export const dynamic = "force-dynamic";

export default async function GuestPage() {
  const guests = await getGuests();
  return <GuestsTable guests={guests} />;
}
