"use client";

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth/queries/auth.mutations";
import { Loader2, LogOut } from "lucide-react";

export function AccountLogoutButton() {
  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isPending}
      onClick={() => logout()}
    >
      {isPending ? (
        <Loader2 data-icon="inline-start" className="animate-spin" />
      ) : (
        <LogOut data-icon="inline-start" />
      )}
      {isPending ? "Signing out" : "Sign out"}
    </Button>
  );
}

