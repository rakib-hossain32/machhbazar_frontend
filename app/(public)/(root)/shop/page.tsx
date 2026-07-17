import { MarketPageHeader } from "@/components/marketplace/page-shell";
import { ShopCatalog } from "@/components/marketplace/shop-catalog";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop Fresh Fish",
  description:
    "Search and filter fresh fish by origin, freshness proof, preparation, seller, and delivery availability.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <MarketPageHeader
        eyebrow="Live catalog"
        title="Shop today’s catch"
        description="Compare clear product images, live lot weight, seller performance, and freshness evidence before adding a fish to your cart."
        breadcrumbs={[{ label: "Shop" }]}
      />
      <Suspense
        fallback={
          <div className="mx-auto min-h-[700px] max-w-7xl animate-pulse bg-muted/40" />
        }
      >
        <ShopCatalog />
      </Suspense>
    </>
  );
}
