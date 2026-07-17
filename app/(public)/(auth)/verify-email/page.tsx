import VerifyEmailForm from "@/features/auth/components/verify-email-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email to activate your Machh Bazar account.",
  robots: { index: false, follow: false },
};

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div className="h-[500px] animate-pulse rounded-lg bg-muted" aria-label="Loading email verification form" />}>
      <VerifyEmailForm />
    </Suspense>
  );
}
