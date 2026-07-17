import { CategoryStrip } from "@/components/landing/category-strip";
import { CustomerReviewsSection } from "@/components/landing/customer-reviews-section";
import { FreshnessShortcutSection } from "@/components/landing/freshness-shortcut-section";
import { HeroSection } from "@/components/landing/hero-section";
import { MobileCartBar } from "@/components/landing/mobile-cart-bar";
import { PopularFishSection } from "@/components/landing/popular-fish-section";
import { RecipeSuggestionsSection } from "@/components/landing/recipe-suggestions-section";
import { SeasonalPreorderSection } from "@/components/landing/seasonal-preorder-section";
import { TrustSection } from "@/components/landing/trust-section";
import { VerifiedCatchSection } from "@/components/landing/verified-catch-section";
import { VerifiedSellersSection } from "@/components/landing/verified-sellers-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fresh Fish with Verified Source",
  description:
    "Shop fresh fish in Dhaka with verified source, catch time, exact weight, seller evidence, and reliable delivery windows.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Machh Bazar — Fresh Fish with Nothing Hidden",
    description: "Today’s verified catch, direct from trusted fish sellers across Bangladesh.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <VerifiedCatchSection />
      <FreshnessShortcutSection />
      <PopularFishSection />
      <VerifiedSellersSection />
      <SeasonalPreorderSection />
      <TrustSection />
      <CustomerReviewsSection />
      <RecipeSuggestionsSection />
      <MobileCartBar />
    </>
  );
}
