"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/features/auth/queries/auth.mutations";
import type { DashboardRole } from "@/lib/constant/dashboard";
import type { UserRole } from "@/lib/utils/auth";
import {
  ChevronsUpDownIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export type AppUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
};

type NavUserProps = {
  role: DashboardRole;
  user: AppUser;
};

const settingsRoutes: Record<DashboardRole, string> = {
  ADMIN: "/dashboard/admin/configuration",
  SELLER: "/dashboard/seller/settings",
};

export function NavUser({ role, user }: NavUserProps) {
  const { mutate: logout, isPending } = useLogoutMutation();
  const name = user.name || "Machh Bazar member";
  const initial = name.charAt(0).toUpperCase();
  const settingsRoute = settingsRoutes[role];
  const profileRoute = "/dashboard/my-profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Open account menu"
            className="h-auto w-full justify-start gap-3 rounded-none border-t px-4 py-3 text-left group-data-[collapsible=icon]:size-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1.5"
            variant="ghost"
          />
        }
      >
        <Avatar className="size-9">
          <AvatarImage alt={name} src={user.image ?? undefined} />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
          <span className="block truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {user.email || "No email available"}
          </span>
        </span>
        <ChevronsUpDownIcon className="ml-auto group-data-[collapsible=icon]:hidden" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64" side="right">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarImage alt={name} src={user.image ?? undefined} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <span className="min-w-0">
              <span className="block truncate font-medium text-foreground">
                {name}
              </span>
              <span className="block truncate text-sm text-muted-foreground">
                {user.email || "No email available"}
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href={profileRoute} />}>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={settingsRoute} />}>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => logout()}
            variant="destructive"
          >
            <LogOutIcon />
            {isPending ? "Logging out" : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
