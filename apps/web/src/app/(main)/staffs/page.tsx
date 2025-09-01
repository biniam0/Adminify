import { getStaffs } from "@/actions/guests-staffs/getStaffs";
import StaffsTable from "@/components/guests-staffs/StaffsTable";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const staffs = await getStaffs();
  return <StaffsTable staffs={staffs} />;
}
