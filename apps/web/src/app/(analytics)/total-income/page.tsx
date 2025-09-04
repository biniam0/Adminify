import { getActivity } from "@/actions/analytics/getActivity";
import IncomeAnalytics from "@/components/analytics/IncomeAnalytics";

const TotalIncomePage = async () => {
  const activities = await getActivity();
  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Total Income Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time insights from guest activities
        </p>
      </div>
      <IncomeAnalytics activities={activities} />
    </div>
  );
};

export default TotalIncomePage;
