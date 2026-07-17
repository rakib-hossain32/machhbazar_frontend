import { CheckoutWizard } from "@/components/marketplace/checkout-wizard";
import { MarketPageHeader } from "@/components/marketplace/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description:
    "Confirm contact, delivery, substitution, payment, and the server-calculated order estimate.",
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return (
    <>
      <MarketPageHeader
        eyebrow="Secure purchase"
        title="Checkout"
        description="Six clear steps from contact to a server-verified final estimate."
        breadcrumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />
      <CheckoutWizard />
    </>
  );
}
