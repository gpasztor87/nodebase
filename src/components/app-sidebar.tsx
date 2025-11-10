"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FolderOpenIcon, GalleryVerticalEndIcon } from "lucide-react";

import appConfig from "@/config/app.config";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

import { NavUser } from "./nav-user";

const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const { data } = useCurrentUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/" prefetch>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEndIcon className="size-4" />
                </div>
                {appConfig.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupContent>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname.startsWith(item.url)}
                      className="gap-x-4 h-10 px-4"
                      asChild
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
