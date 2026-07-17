"use client";

import { dashboardIcons } from "@/components/dashboard/dashboard-icons";
import { LogoIcon } from "@/components/logo";
import { NavUser, type AppUser } from "@/components/nav-user";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebar } from "@/lib/constant/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AppSidebarProps = {
  role: keyof typeof sidebar;
  user: AppUser;
};

export function AppSidebar({ role, user }: AppSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const groups = sidebar[role] ?? sidebar.USER;

  return (
    <Sidebar
      className={cn(
        "*:data-[slot=sidebar-inner]:bg-background",
        "**:data-[slot=sidebar-menu-button]:[&>span]:text-foreground/75",
      )}
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="h-16 justify-center border-b px-2">
        <SidebarMenuButton
          render={<Link href="/" />}
          size="lg"
          tooltip="Machh Bazar"
        >
          <LogoIcon />
          <span className="font-medium text-foreground!">Machh Bazar</span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = dashboardIcons[item.icon];
                  const isActive = item.exact
                    ? pathname === item.url
                    : pathname === item.url ||
                      pathname.startsWith(`${item.url}/`);

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        className="h-9 text-[15px]"
                        isActive={isActive}
                        render={
                          <Link
                            href={item.url}
                            onClick={() => setOpenMobile(false)}
                          />
                        }
                        tooltip={item.title}
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-0 p-0">
        <NavUser role={role} user={user} />
        <div className="px-4 pt-4 pb-2 transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0">
          <p className="text-nowrap text-[9px] text-muted-foreground">
            Copyright {new Date().getFullYear()} Machh Bazar
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
