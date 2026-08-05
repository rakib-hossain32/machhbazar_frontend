"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";
import ChangePasswordDialog from "./change-password-dialog";

type ProfileSecuritySectionProps = {
  disabled?: boolean;
};

export function ProfileSecuritySection({
  disabled = false,
}: ProfileSecuritySectionProps) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  return (
    <section aria-labelledby="profile-security-title">
      <h3 id="profile-security-title" className="mb-2 text-lg font-semibold">
        Security
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Manage your password and account security
      </p>

      <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Lock className="text-primary" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium">Password</span>
            <span className="block text-sm text-muted-foreground">
              Last changed recently
            </span>
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => setShowPasswordDialog(true)}
          disabled={disabled}
        >
          Change Password
        </Button>

        <ChangePasswordDialog
          open={showPasswordDialog}
          onOpenChange={setShowPasswordDialog}
        />
      </div>
    </section>
  );
}
