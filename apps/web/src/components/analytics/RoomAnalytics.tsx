"use client";

import React from "react";
import { CheckCircle, XCircle, Bed, CalendarCheck2 } from "lucide-react";
import type { ActionType } from "@/types/booking.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface RoomAnalyticsProps {
  activities: ActionType[];
  totalRooms: number; // pass the total number of rooms in the system
}

const RoomAnalytics = ({ activities, totalRooms }: RoomAnalyticsProps) => {
  // Count reserved rooms (unique roomIds with a booking action)
  const reservedRooms = new Set(
    activities
      .filter((a) => a.action === "BOOKED")
      .map((a) => a.roomId)
      .filter(Boolean)
  ).size;

  // Available rooms = total - reserved
  const availableRooms = Math.max(totalRooms - reservedRooms, 0);

  // Approved / Rejected bookings
  const approvedRooms = activities.filter(
    (a) =>
      a.action === "BOOKED" &&
      (a.details?.status === "APPROVED" || a.details?.autoApproved)
  ).length;

  const rejectedRooms = activities.filter(
    (a) => a.action === "BOOKED" && a.details?.status === "REJECTED"
  ).length;

  const roomChartData = activities
    .filter((a) => a.action === "BOOKED")
    .reduce(
      (
        acc: Record<
          string,
          { date: string; approved: number; rejected: number }
        >,
        a
      ) => {
        const date = new Date(a.timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        if (!acc[date]) {
          acc[date] = { date, approved: 0, rejected: 0 };
        }

        if (a.details?.status === "APPROVED" || a.details?.autoApproved) {
          acc[date].approved += 1;
        } else if (a.details?.status === "REJECTED") {
          acc[date].rejected += 1;
        }

        return acc;
      },
      {}
    );

  const chartData = Object.values(roomChartData).sort(
    (a, b) =>
      new Date(a.date + " 2024").getTime() -
      new Date(b.date + " 2024").getTime()
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Room Analytics</CardTitle>
          <CardDescription>
            Overview of reservations and room statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Reserved Rooms */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <CalendarCheck2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {reservedRooms}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Reserved Rooms
              </div>
            </div>

            {/* Available Rooms */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <Bed className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {availableRooms}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Available Rooms
              </div>
            </div>

            {/* Approved */}
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {approvedRooms}
              </div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400">
                Approved Bookings
              </div>
            </div>

            {/* Rejected */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
              <div className="flex justify-center mb-2">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {rejectedRooms}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Rejected Bookings
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Room Booking Trends</CardTitle>
            <CardDescription>
              Daily approved vs rejected bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Approved"
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Rejected"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomAnalytics;
