import { BookOpenText, Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./ui/nav-user";

const items = [
  {
    title: "Home",
    url: "/articles",
    icon: Home,
  },
  {
    title: "Your Blogs",
    url: "/user-blogs",
    icon: BookOpenText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="py-2 h-full flex flex-col">
        <SidebarHeader className="items-center gap-2 font-medium flex-row">
          <div className="bg-logo-bg text-sidebar-primary-foreground flex size-6 items-center justify-center rounded-md">
            <BookOpenText className="size-4" />
          </div>
          <h2 className="font-merienda text-xl font-semibold">Blogi</h2>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
