import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { getActivity } from "@/actions/analytics/getActivity";

const SectionCards = async () => {
  const activities = await getActivity();
  const totalBookings = activities.filter((a) => a.action === "BOOKED").length;
  const approvedBookings = activities.filter(
    (a) => a.action === "APPROVED_BOOKING" && a.details.status === "APPROVED"
  ).length;
  const rejectedBookings = activities.filter(
    (a) => a.action === "APPROVED_BOOKING" && a.details.status === "REJECTED"
  ).length;

  const uniqueUsers = new Set(activities.map((a) => a.userId)).size;
  const uniqueRooms = new Set(activities.map((a) => a.roomId)).size;

  // Calculate approval rate
  const approvalRate =
    totalBookings > 0
      ? Math.round((approvedBookings / totalBookings) * 100)
      : 0;

  // Calculate auto-approval rate
  const autoApprovedBookings = activities.filter(
    (a) => a.action === "BOOKED" && a.details.autoApproved
  ).length;
  const autoApprovalRate =
    totalBookings > 0
      ? Math.round((autoApprovedBookings / totalBookings) * 100)
      : 0;

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights from your booking activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Bookings */}
          <Card>
            <CardHeader>
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums">
                {totalBookings}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3" />
                  Recent activity
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                Active booking requests
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Sept 1-3, 2025 activity
              </div>
            </CardFooter>
          </Card>

          {/* Approval Rate */}
          <Card>
            <CardHeader>
              <CardDescription>Approval Rate</CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums">
                {approvalRate}%
              </CardTitle>
              <CardAction>
                <Badge variant={approvalRate >= 50 ? "default" : "destructive"}>
                  {approvalRate >= 50 ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  {approvedBookings}/{totalBookings} approved
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                {approvalRate >= 50
                  ? "Strong approval rate"
                  : "Needs attention"}
                {approvalRate >= 50 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {rejectedBookings} rejection{rejectedBookings !== 1 ? "s" : ""}{" "}
                recorded
              </div>
            </CardFooter>
          </Card>

          {/* Active Users */}
          <Card>
            <CardHeader>
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums">
                {uniqueUsers}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Users className="w-3 h-3" />
                  Unique guests
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                Individual booking users
                <Users className="w-4 h-4" />
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {uniqueRooms} room{uniqueRooms !== 1 ? "s" : ""} in demand
              </div>
            </CardFooter>
          </Card>

          {/* Auto-Approval Rate */}
          <Card>
            <CardHeader>
              <CardDescription>Auto-Approval Rate</CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums">
                {autoApprovalRate}%
              </CardTitle>
              <CardAction>
                <Badge variant="default">
                  <TrendingUp className="w-3 h-3" />
                  Efficiency
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                Streamlined booking flow
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {autoApprovedBookings} auto-approved booking
                {autoApprovedBookings !== 1 ? "s" : ""}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Activity Timeline Summary */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity Summary</CardTitle>
              <CardDescription>
                Latest booking activities from your system
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {
                      activities.filter(
                        (a) => new Date(a.timestamp).getDate() === 1
                      ).length
                    }
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Sept 1st Activities
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {
                      activities.filter(
                        (a) => new Date(a.timestamp).getDate() === 3
                      ).length
                    }
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Sept 3rd Activities
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {new Set(activities.map((a) => a.bookingId)).size}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Unique Bookings
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectionCards;
