"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogIn, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useLogoutMutation } from "../queries/auth.mutations";
import { useMeQuery } from "../queries/auth.querie";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileMenu({ showSignInLabel = false }: { showSignInLabel?: boolean }) {
  const { data: user, isLoading } = useMeQuery();
  const { mutate: logout, isPending } = useLogoutMutation();

  if (isLoading) {
    return <Skeleton className={showSignInLabel ? "h-9 w-20 rounded-md" : "size-8 rounded-full"} />;
  }

  if (!user) {
    return (
      <Button
        render={<Link href="/login" />}
        variant="outline"
        size={showSignInLabel ? "lg" : "icon"}
        aria-label="Sign in"
        nativeButton={false}
        className={showSignInLabel ? "h-9 rounded-none border-market-ink/20 bg-transparent px-3 text-current hover:bg-market-ink/8 hover:text-current" : undefined}
      >
        <LogIn className="size-4" aria-hidden="true" />
        {showSignInLabel ? <span>Sign in</span> : null}
      </Button>
    );
  }

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group flex items-center gap-2 rounded-full p-0.5 outline-none ring-2 ring-transparent transition-all hover:ring-border focus-visible:ring-ring"
        aria-label="User menu"
      >
        <Avatar size="default">
          <AvatarImage src={user.image || ""} alt={user.name} referrerPolicy="no-referrer" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        {/* User info header */}
        <div className="flex items-center gap-3 px-2 py-2.5">
          <Avatar size="lg">
            <AvatarImage src={user.image || ""} alt={user.name} referrerPolicy="no-referrer" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {user.role === "USER" ? (
            <DropdownMenuItem render={<Link href="/my-profile" />}>
              <UserRound /> My profile
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            render={
              <Link href={user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard"} />
            }
          >
            <LayoutDashboard /> Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={() => logout()}
          className="gap-2"
        >
          <LogOut className="size-4" />
          {isPending ? "Signing out…" : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
