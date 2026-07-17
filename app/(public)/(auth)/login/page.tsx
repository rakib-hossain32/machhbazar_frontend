import LoginForm from "@/features/auth/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to manage your Machh Bazar orders, wishlist, and account.",
  robots: { index: false, follow: false },
};

export default async function Login({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) {
  const params = await searchParams;
  return <LoginForm searchParams={params} />;
}
