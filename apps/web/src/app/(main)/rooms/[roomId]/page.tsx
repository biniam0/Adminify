import { getRoom } from "@/actions/rooms/getRoom";
import { RoomCard } from "@/components/guest-house/Room";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = await getRoom(roomId);

  if (!room) {
    return <p className="p-4 text-red-600">Room not found</p>;
  }

  return (
    <div className="flex justify-center p-4">
      <RoomCard room={room} />
    </div>
  );
}
