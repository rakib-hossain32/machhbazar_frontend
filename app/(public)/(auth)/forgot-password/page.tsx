import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recover Account",
  description: "Request a secure one-time code to recover your Machh Bazar account.",
  robots: { index: false, follow: false },
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
