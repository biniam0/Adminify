import { getActivity } from "@/actions/analytics/getActivity";
import { getRooms } from "@/actions/rooms/getRooms";
import RoomAnalytics from "@/components/analytics/RoomAnalytics";

const TotalIncomePage = async () => {
  const activities = await getActivity();
  const totalRooms = (await getRooms()).length
  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Rooms Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time insights about rooms
        </p>
      </div>
      <RoomAnalytics activities={activities} totalRooms={totalRooms} />
    </div>
  );
};

export default TotalIncomePage;
