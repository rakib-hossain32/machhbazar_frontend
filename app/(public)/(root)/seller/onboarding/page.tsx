import { SellerOnboardingPage } from "@/components/marketplace/seller-onboarding-page";
import { getSession } from "@/features/auth/services/auth.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Seller",
  description:
    "Apply to sell traceable fish through Machh Bazar with verified shop details, private KYC, exact-weight records, and accountable fulfillment.",
  alternates: { canonical: "/seller/onboarding" },
};

export default async function SellerOnboardingRoute() {
  const user = await getSession();

  return <SellerOnboardingPage isAuthenticated={Boolean(user)} />;
}
