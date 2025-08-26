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
import { BanknoteArrowUp, Home, LifeBuoy, Warehouse } from "lucide-react";
import { NavQuickLinks } from "./nav-quick-links";
import { NavManagement } from "./nav-management";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
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
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
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
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
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
      name: "Add Guest House",
      url: "#",
      icon: IconDatabase,
    },
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
      url: "#",
      icon: IconFileWord,
    },
    {
      name: "Add/Edit Rooms",
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
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavOverview items={data.navMain} />
        <NavManagement items={data.managements} />
        <NavCharts items={data.documents} />
        <NavQuickLinks items={data.quickLinks} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
