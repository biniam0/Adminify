import { getRooms } from "@/actions/rooms/getRooms";
import RoomsGrid from "@/components/room/RoomsGrid";

export default async function RoomsPage() {
  const rooms = await getRooms();
  return <RoomsGrid rooms={rooms} />;
}
