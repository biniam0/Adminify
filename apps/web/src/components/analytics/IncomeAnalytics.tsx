"use client";

import React from "react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import type { ActionType } from "@/types/booking.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface IncomeByDate {
  [key: string]: number;
}

const IncomeAnalytics = ({ activities }: { activities: ActionType[] }) => {
  // Calculate total income from activities - only from approved bookings
  const totalIncome = activities.reduce((sum, activity) => {
    if (
      activity.action === "BOOKED" &&
      (activity.details?.status === "APPROVED" ||
        activity.details?.autoApproved)
    ) {
      const amount = activity.details?.amount || 0;
      return sum + (typeof amount === "number" ? amount : 0);
    }
    return sum;
  }, 0);

  // Prepare data for analysis - group by date
  const incomeByDate: IncomeByDate = activities.reduce((acc, activity) => {
    if (
      activity.action === "BOOKED" &&
      (activity.details?.status === "APPROVED" ||
        activity.details?.autoApproved)
    ) {
      const date = new Date(activity.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const amount = activity.details?.amount || 0;

      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += typeof amount === "number" ? amount : 0;
    }
    return acc;
  }, {} as IncomeByDate);

  const dailyIncomes = Object.values(incomeByDate);
  const activeDays = Object.keys(incomeByDate).length;
  const peakDay = Math.max(...dailyIncomes, 0);
  const averageDaily = activeDays > 0 ? totalIncome / activeDays : 0;

  // Calculate growth trend (simple version)
  const sortedDates = Object.keys(incomeByDate).sort();
  const growthTrend =
    sortedDates.length > 1
      ? ((incomeByDate[sortedDates[sortedDates.length - 1]] -
          incomeByDate[sortedDates[0]]) /
          incomeByDate[sortedDates[0]]) *
        100
      : 0;

  const chartData = Object.entries(incomeByDate)
    .map(([date, income]) => ({
      date,
      income,
    }))
    .sort(
      (a, b) =>
        new Date(a.date + " 2024").getTime() -
        new Date(b.date + " 2024").getTime()
    );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Income</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums flex items-center gap-2">
            <DollarSign className="w-8 h-8 text-green-600" />$
            {totalIncome.toLocaleString()}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={growthTrend >= 0 ? "default" : "destructive"}>
              {growthTrend >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(growthTrend).toFixed(1)}% trend
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Income Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardDescription>Peak Day</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-600">
              ${peakDay.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Highest single-day income
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Daily Average</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600">
              ${Math.round(averageDaily).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average income per active day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Active Days</CardDescription>
            <CardTitle className="text-2xl font-bold text-purple-600">
              {activeDays}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Days with booking income
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Income Breakdown */}
      {activeDays > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Income Breakdown</CardTitle>
            <CardDescription>
              Daily income summary from approved bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(incomeByDate)
                .sort(
                  ([a], [b]) =>
                    new Date(a + " 2024").getTime() -
                    new Date(b + " 2024").getTime()
                )
                .map(([date, income]) => (
                  <div
                    key={date}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{date}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ${income.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.round((income / totalIncome) * 100)}% of total
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeDays === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                No income data available
              </h3>
              <p className="text-sm">
                Approved bookings will appear here once processed
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeDays > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Income Chart</CardTitle>
            <CardDescription>
              Visual trend of approved booking income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#16a34a" // green-600
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncomeAnalytics;
