import ResetPasswordForm from "@/features/auth/components/reset-password-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Verify your recovery code and choose a new Machh Bazar password.",
  robots: { index: false, follow: false },
};

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="h-[560px] animate-pulse rounded-lg bg-muted" aria-label="Loading password reset form" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
