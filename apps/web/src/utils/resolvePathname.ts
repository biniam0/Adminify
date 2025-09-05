export function resolvePathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "Dashboard";

  const map: Record<string, string> = {
    analytics: "Analytics",
    overview: "Overview",
    "rooms-analytic": "Rooms Analytics",
    "total-income": "Total Income",
    auth: "Authentication",
    signin: "Sign In",
    main: "Main",
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
