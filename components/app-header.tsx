"use client";

import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { dashboardIcons } from "@/components/dashboard/dashboard-icons";
import { DecorIcon } from "@/components/decor-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sidebar } from "@/lib/constant/dashboard";
import { cn } from "@/lib/utils";
import { BellIcon, SendIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type AppHeaderProps = {
  role: keyof typeof sidebar;
};

export function AppHeader({ role }: AppHeaderProps) {
  const pathname = usePathname();
  const items = (sidebar[role] ?? sidebar.USER).flatMap(
    (group) => group.items,
  );
  const activeItem = items
    .filter((item) =>
      item.exact
        ? pathname === item.url
        : pathname === item.url || pathname.startsWith(`${item.url}/`),
    )
    .sort((a, b) => b.url.length - a.url.length)[0];
  const ActiveIcon = activeItem
    ? dashboardIcons[activeItem.icon]
    : undefined;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6",
        "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50",
      )}
    >
      <DecorIcon className="hidden md:block" position="bottom-left" />
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="mr-2 h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <AppBreadcrumbs
          page={{
            title: activeItem?.title ?? "Dashboard",
            icon: ActiveIcon ? <ActiveIcon /> : undefined,
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button aria-label="Messages" size="icon-sm" variant="outline">
          <SendIcon />
        </Button>
        <Button aria-label="Notifications" size="icon-sm" variant="outline">
          <BellIcon />
        </Button>
      </div>
    </header>
  );
}
