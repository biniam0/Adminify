import { getActivity } from "@/actions/analytics/getActivity";
import IncomeAnalytics from "@/components/analytics/IncomeActivities";



const TotalIncomePage = async () => {
  const activities = await getActivity();
  return <IncomeAnalytics activities={activities} />;
};

export default TotalIncomePage;
