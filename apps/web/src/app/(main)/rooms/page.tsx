import { getRooms } from "@/actions/rooms/getRooms";
import RoomsTable from "@/components/guest-house/RoomTable";

export default async function RoomsPage() {
  const rooms = await getRooms();
  return <RoomsTable rooms={rooms} />;
}
