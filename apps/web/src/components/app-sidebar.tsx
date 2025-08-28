"use client";

import {
  IconBuilding,
  IconCurrencyDollar,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconLifebuoy,
  IconReport,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { NavCharts } from "@/components/nav-charts";
import { NavOverview } from "@/components/nav-overview";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavManagement } from "./nav-management";
import { NavQuickLinks } from "./nav-quick-links";
import { BookRoomButton } from "./room/BookRoomButton";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { BookRoomModal } from "./room/BookRoomModal";
import { BookRoomPage } from "./room/BookRoomPage";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session, signOut, isLoading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !session && pathname !== "/signin") {
      router.push("/signin");
    }
  }, [isLoading, session, pathname, router]);

  if (isLoading || !session) {
    return null;
  }

  const role = session.user.role;

  const overviewItems =
    role === "admin"
      ? data.overview
      : role === "staff"
      ? data.overview.filter((item) => item.title !== "Total Income")
      : [];

  const managementItems =
    role === "admin"
      ? data.managements
      : role === "staff"
      ? data.managements.filter((item) =>
          ["List Guest Houses", "List Rooms", "Guests"].includes(item.name)
        )
      : data.managements.filter((item) =>
          ["List Guest Houses", "List Rooms"].includes(item.name)
        );

  const quickLinksItems =
    role === "admin"
      ? data.quickLinks
      : role === "staff"
      ? data.quickLinks.filter((item) => item.name === "Approve Booking")
      : [];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/" className="flex justify-between">
                <div className="flex justify-center gap-2">
                  <Home className="!size-5" />
                  <span className="text-base font-semibold">Simba Home</span>
                </div>
                <Badge>{session.user.role?.toUpperCase()}</Badge>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <BookRoomButton
              label="Book Now"
              onClick={() => setModalOpen(true)}
            />
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="mt-3" />
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto hide-scrollbar flex flex-col">
        {overviewItems.length > 0 && <NavOverview items={overviewItems} />}
        {managementItems.length > 0 && (
          <NavManagement items={managementItems} />
        )}
        {role === "admin" && <NavCharts items={data.charts} />}
        {quickLinksItems.length > 0 && (
          <NavQuickLinks items={quickLinksItems} />
        )}
        <div className="mt-auto">
          <Separator />
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} signOut={signOut} />
      </SidebarFooter>

      <BookRoomModal open={modalOpen} onOpenChange={setModalOpen}/>
    </Sidebar>
  );
}

const guestHouses = [
  {
    id: "gh1",
    name: "Simba Guest House",
    rooms: [
      { id: "r1", name: "Room 101" },
      { id: "r2", name: "Room 102" },
    ],
  },
  {
    id: "gh2",
    name: "Lion Guest House",
    rooms: [{ id: "r3", name: "Room 201" }],
  },
];

const data = {
  overview: [
    { title: "Total Reservation", url: "/", icon: IconLifebuoy },
    { title: "Total Income", url: "#", icon: IconCurrencyDollar },
    { title: "Available Rooms", url: "#", icon: IconBuilding },
  ],
  managements: [
    { name: "List Guest Houses", url: "/guest-houses", icon: IconDatabase },
    { name: "Add Guest Houses", url: "#", icon: IconReport },
    { name: "List Rooms", url: "/rooms", icon: IconFileWord },
    { name: "Add Rooms", url: "#", icon: IconFileWord },
    { name: "Guests", url: "#", icon: IconDatabase },
    { name: "Staffs", url: "#", icon: IconReport },
  ],
  charts: [
    { name: "Daily Bookings", url: "#", icon: IconDatabase },
    { name: "Monthly Bookings", url: "#", icon: IconReport },
    { name: "Revenue", url: "#", icon: IconFileWord },
  ],
  quickLinks: [
    { name: "Approve Booking", url: "#", icon: IconReport },
    { name: "Manage User", url: "#", icon: IconFileWord },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
  ],
};
