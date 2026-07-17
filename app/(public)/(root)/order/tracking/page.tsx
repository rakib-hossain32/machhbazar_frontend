import { OrderLookup } from "@/components/marketplace/order-lookup";
import { MarketPageHeader, MarketSection } from "@/components/marketplace/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Track an Order", description: "Find a Machh Bazar order by order number.", robots: { index: false, follow: false } };
export default function OrderTrackingPage() { return <><MarketPageHeader eyebrow="Order lookup" title="Track an order" description="Enter the order number to see seller fulfillment, packed weight, invoice, and delivery progress." breadcrumbs={[{ label: "Order tracking" }]} /><MarketSection className="py-12 sm:py-20"><OrderLookup /></MarketSection></>; }
