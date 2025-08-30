import { getRoom } from "@/actions/rooms/getRoom";
import { RoomDetail } from "@/components/room/RoomDetail";

export const dynamic = "force-dynamic";

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
      <RoomDetail room={room} />
    </div>
  );
}
