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
import { Book, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { NavManagement } from "./nav-management";
import { NavQuickLinks } from "./nav-quick-links";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useEffect } from "react";
import { Badge } from "./ui/badge";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session, signOut, isLoading } = useAuth();
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
            <Button className="w-full max-w-[255px] mt-4" size="sm">
              <Book className="!size-5" />
              <span className="text-base font-semibold">Book Room</span>
            </Button>
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
    </Sidebar>
  );
}

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
