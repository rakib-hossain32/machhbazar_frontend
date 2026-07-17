import RegisterForm from "@/features/auth/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a secure Machh Bazar customer account.",
  robots: { index: false, follow: false },
};

export default function Register() {
  return <RegisterForm />;
}
