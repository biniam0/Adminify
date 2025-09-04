import type { ActionType } from "@/types/booking.type";

export const getActivityDateRange = (activities: ActionType[]) => {
  if (activities.length === 0) return "No activity";

  const dates = activities.map((a) => new Date(a.timestamp).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (minDate.toDateString() === maxDate.toDateString()) {
    return `${formatDate(minDate)} activity`;
  }
  if (
    minDate.getMonth() === maxDate.getMonth() &&
    minDate.getFullYear() === maxDate.getFullYear()
  ) {
    return `${minDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}-${maxDate.getDate()}, ${maxDate.getFullYear()} activity`;
  }
  return `${formatDate(minDate)} - ${formatDate(maxDate)} activity`;
};
