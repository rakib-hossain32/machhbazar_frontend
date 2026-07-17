import { Button } from "@/components/ui/button";
import { MarketSection } from "@/components/marketplace/page-shell";
import {
  ArrowRight,
  Check,
  FileCheck2,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Machh Bazar order has been confirmed.",
  robots: { index: false, follow: false },
};
export default function OrderSuccessPage() {
  return (
    <div className="min-h-[70svh] bg-surface-muted">
      <MarketSection className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex size-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Check className="size-7" />
          </div>
          <p className="mt-7 text-[10px] font-bold text-primary uppercase">
            Order accepted
          </p>
          <h1 className="mt-3 font-heading text-5xl font-semibold text-ink sm:text-6xl">
            The market has your order.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Order <strong className="text-ink">MB-260716-1842</strong> is
            confirmed. Sellers will accept their items, pack the verified
            weight, and publish final evidence before dispatch.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {[
              ["Estimate", "৳3,640"],
              ["Delivery", "Today · 6–8 PM"],
              ["Payment", "Cash on delivery"],
            ].map(([label, value]) => (
              <div key={label} className="bg-surface p-5">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="mt-2 text-sm font-bold text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-sm font-bold text-ink">What happens next</h2>
            <div className="mt-4 border-t border-border">
              {[
                {
                  icon: PackageCheck,
                  title: "Seller acceptance",
                  text: "Each seller confirms inventory and preparation.",
                },
                {
                  icon: FileCheck2,
                  title: "Packed weight",
                  text: "The final invoice uses verified packed weight.",
                },
                {
                  icon: Truck,
                  title: "Delivery handoff",
                  text: "You receive a delivery update and OTP.",
                },
              ].map(({ icon: Icon, title, text }, index) => (
                <div
                  key={title}
                  className="grid grid-cols-[34px_1fr_auto] gap-3 border-b border-border py-4"
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-md ${index ? "bg-primary-soft text-primary" : "bg-coral text-white"}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">{title}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {text}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="/account/orders/MB-260716-1842" />}
              nativeButton={false}
              className="h-11 rounded-md"
            >
              Track order <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="/shop" />}
              nativeButton={false}
              variant="outline"
              className="h-11 rounded-md bg-surface"
            >
              Return to market
            </Button>
          </div>
          <div className="mt-8 flex items-start gap-3 border-t border-border pt-5 text-[10px] leading-5 text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-primary" /> Your
            displayed total remains an estimate until packed weights are
            confirmed by the server.
          </div>
        </div>
      </MarketSection>
    </div>
  );
}
