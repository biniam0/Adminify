export function resolvePathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "Dashboard";

  const map: Record<string, string> = {
    overview: "Overview",
    "rooms-analytic": "Rooms Analytics",
    "total-income": "Total Income",
    "approve-booking": "Approve Booking",
    "guest-houses": "Guest Houses",
    guests: "Guests",
    rooms: "Rooms",
    staffs: "Staffs",
  };

  return segments
    .map((seg) => {
      if (map[seg]) return map[seg];
      if (seg.match(/^\[.*\]$/)) return "Detail";
      return seg.charAt(0).toUpperCase() + seg.slice(1);
    })
    .join(" / ");
}
