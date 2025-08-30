import { getPendingBooking } from "@/actions/booking/get-pending-booking";
import PendingBookTable from "@/components/booking/PendingBook";

export const dynamic = "force-dynamic";

export default async function BookingApprovalPage() {
  const pendingBooks = await getPendingBooking();
  return <PendingBookTable pendingBooks={pendingBooks} />;
}
