"use client";

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconLifebuoy,
  IconCurrencyDollar,
  IconBuilding,
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
import { BanknoteArrowUp, Book, Home, LifeBuoy, Warehouse } from "lucide-react";
import { NavQuickLinks } from "./nav-quick-links";
import { NavManagement } from "./nav-management";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  overview: [
    {
      title: "Total Reservation",
      url: "/",
      icon: IconLifebuoy,
    },
    {
      title: "Total Income",
      url: "#",
      icon: IconCurrencyDollar,
    },
    {
      title: "Available Rooms",
      url: "#",
      icon: IconBuilding,
    },
  ],
  managements: [
    {
      name: "List Guest Houses",
      url: "/guest-houses",
      icon: IconDatabase,
    },
    {
      name: "Add Guest Houses",
      url: "#",
      icon: IconReport,
    },
    {
      name: "List Rooms",
      url: "/rooms",
      icon: IconFileWord,
    },
    {
      name: "Add Rooms",
      url: "#",
      icon: IconFileWord,
    },
    {
      name: "Customer",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Staffs",
      url: "#",
      icon: IconReport,
    },
  ],
  charts: [
    {
      name: "Daily Bookings",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Monthly Bookings",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Revenue",
      url: "#",
      icon: IconFileWord,
    },
  ],
  quickLinks: [
    {
      name: "Approve Booking",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Manage User",
      url: "#",
      icon: IconFileWord,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <Home className="!size-5" />
                <span className="text-base font-semibold">Simba Home</span>
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
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto hide-scrollbar">
        <NavOverview items={data.overview} />
        <NavManagement items={data.managements} />
        <NavCharts items={data.charts} />
        <NavQuickLinks items={data.quickLinks} />
        <Separator />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
