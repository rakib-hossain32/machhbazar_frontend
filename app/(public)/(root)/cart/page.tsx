import { CartView } from "@/components/marketplace/cart-view";
import { MarketPageHeader } from "@/components/marketplace/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review seller-grouped fish, requested weight, preparation, delivery feasibility, and the current estimate.",
  robots: { index: false, follow: false },
};
export default function CartPage() {
  return (
    <>
      <MarketPageHeader
        eyebrow="Current basket"
        title="Your market cart"
        description="Weights and totals remain estimates until each seller packs the verified lot."
        breadcrumbs={[{ label: "Cart" }]}
      />
      <CartView />
    </>
  );
}
