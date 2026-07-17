"use client";

import { allProducts } from "@/components/marketplace/market-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type CartItem = {
  id: string;
  productIndex: number;
  seller: string;
  weight: number;
  cut: "Whole" | "Cleaned" | "Steaks";
  available: boolean;
};

const initialItems: CartItem[] = [
  {
    id: "cart-1",
    productIndex: 0,
    seller: "Mawa River Collective",
    weight: 1.5,
    cut: "Steaks",
    available: true,
  },
  {
    id: "cart-2",
    productIndex: 1,
    seller: "Mawa River Collective",
    weight: 1,
    cut: "Whole",
    available: true,
  },
  {
    id: "cart-3",
    productIndex: 2,
    seller: "Shyamnagar Aquatics",
    weight: 0.5,
    cut: "Cleaned",
    available: false,
  },
];

const cutCharge = { Whole: 0, Cleaned: 80, Steaks: 120 } as const;

export function CartView() {
  const [items, setItems] = useState(initialItems);
  const [allowSubstitution, setAllowSubstitution] = useState(false);
  const groups = useMemo(
    () => Array.from(new Set(items.map((item) => item.seller))),
    [items],
  );
  const subtotal = items
    .filter((item) => item.available)
    .reduce(
      (total, item) =>
        total +
        allProducts[item.productIndex].price * item.weight +
        cutCharge[item.cut],
      0,
    );
  const deliveryFee = groups.length * 90;

  function updateItem(id: string, patch: Partial<CartItem>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 pb-28 sm:px-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-10 lg:py-12 lg:pb-12 xl:px-0">
      <div className="space-y-6">
        {items.some((item) => !item.available) ? (
          <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/8 p-4">
            <AlertTriangle className="size-5 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-bold text-ink">
                One lot changed after it was added.
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Unavailable items are excluded from the current estimate. Choose
                a replacement or remove them before checkout.
              </p>
            </div>
          </div>
        ) : null}

        {groups.map((seller) => (
          <section
            key={seller}
            className="overflow-hidden rounded-lg border border-border bg-surface"
            aria-labelledby={`seller-${seller}`}
          >
            <header className="flex items-center justify-between gap-4 border-b border-border bg-surface-muted px-4 py-3 sm:px-5">
              <div>
                <p
                  className="flex items-center gap-2 text-xs font-bold text-ink"
                  id={`seller-${seller}`}
                >
                  <BadgeCheck className="size-4 text-primary" /> {seller}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Separate fulfillment · One delivery handoff
                </p>
              </div>
              <span className="text-[10px] font-bold text-primary uppercase">
                Verified seller
              </span>
            </header>
            <div className="divide-y divide-border">
              {items
                .filter((item) => item.seller === seller)
                .map((item) => {
                  const product = allProducts[item.productIndex];
                  const total =
                    product.price * item.weight + cutCharge[item.cut];
                  return (
                    <article
                      key={item.id}
                      className={`grid gap-4 p-4 sm:grid-cols-[110px_1fr_auto] sm:p-5 ${item.available ? "" : "bg-muted/45 opacity-72"}`}
                    >
                      <div className="relative aspect-[1.15] overflow-hidden rounded-lg bg-secondary sm:aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="110px"
                          className="object-cover"
                        />
                        {!item.available ? (
                          <span className="absolute inset-x-0 bottom-0 bg-warning px-2 py-1 text-center text-[9px] font-bold text-white">
                            LOT UNAVAILABLE
                          </span>
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/fish/${product.slug}`}
                              className="font-heading text-2xl font-semibold text-ink hover:text-primary"
                            >
                              {product.name}
                            </Link>
                            <p className="mt-1 text-[10px] text-muted-foreground">
                              Lot MB–0716 · {product.evidence}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="rounded-md text-muted-foreground hover:text-destructive"
                            onClick={() =>
                              setItems((current) =>
                                current.filter((entry) => entry.id !== item.id),
                              )
                            }
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <div className="flex h-9 items-center rounded-md border border-border">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() =>
                                updateItem(item.id, {
                                  weight: Math.max(0.5, item.weight - 0.5),
                                })
                              }
                            >
                              <Minus className="size-3.5" />
                            </Button>
                            <span className="min-w-14 text-center text-xs font-bold">
                              {item.weight} kg
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              onClick={() =>
                                updateItem(item.id, {
                                  weight: item.weight + 0.5,
                                })
                              }
                            >
                              <Plus className="size-3.5" />
                            </Button>
                          </div>
                          <div className="flex rounded-md border border-border p-0.5">
                            {(["Whole", "Cleaned", "Steaks"] as const).map(
                              (cut) => (
                                <button
                                  key={cut}
                                  type="button"
                                  onClick={() => updateItem(item.id, { cut })}
                                  className={`rounded-[4px] px-2 py-1 text-[9px] font-bold ${item.cut === cut ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-ink"}`}
                                >
                                  {cut}
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="self-end text-right">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">
                          Estimated
                        </p>
                        <p className="mt-1 text-lg font-bold text-ink">
                          ৳{total.toLocaleString("en-US")}
                        </p>
                        <p className="mt-1 text-[9px] text-muted-foreground">
                          ৳{product.price}/kg{" "}
                          {cutCharge[item.cut]
                            ? `+ ৳${cutCharge[item.cut]} cut`
                            : ""}
                        </p>
                      </div>
                    </article>
                  );
                })}
            </div>
            <footer className="flex items-center gap-2 border-t border-border px-4 py-3 text-[10px] text-muted-foreground sm:px-5">
              <Truck className="size-3.5 text-action" /> Delivery feasible:
              Today, 6:00–8:00 PM
            </footer>
          </section>
        ))}

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface p-4">
          <Checkbox
            checked={allowSubstitution}
            onCheckedChange={(value) => setAllowSubstitution(Boolean(value))}
            className="mt-0.5"
          />
          <span>
            <span className="block text-xs font-bold text-ink">
              Allow a verified equivalent if a lot becomes unavailable
            </span>
            <span className="mt-1 block text-[10px] leading-5 text-muted-foreground">
              You will still approve weight or price changes outside your
              selected tolerance.
            </span>
          </span>
        </label>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <ShoppingBag className="size-4 text-primary" />
            <h2 className="text-sm font-bold text-ink">Order estimate</h2>
          </div>
          <dl className="space-y-3 py-5 text-xs">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Available items</dt>
              <dd className="font-bold text-ink">
                ৳{subtotal.toLocaleString("en-US")}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Delivery · {groups.length} sellers
              </dt>
              <dd className="font-bold text-ink">৳{deliveryFee}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Service fee</dt>
              <dd className="font-bold text-ink">৳45</dd>
            </div>
          </dl>
          <div className="flex items-end justify-between border-t border-border pt-4">
            <div>
              <p className="text-[9px] font-bold text-muted-foreground uppercase">
                Estimated total
              </p>
              <p className="mt-1 text-[9px] text-muted-foreground">
                Final packed weight applies
              </p>
            </div>
            <p className="font-heading text-3xl font-semibold text-ink">
              ৳{(subtotal + deliveryFee + 45).toLocaleString("en-US")}
            </p>
          </div>
          <Button
            render={<Link href="/checkout" />}
            nativeButton={false}
            className="mt-5 h-12 w-full rounded-md text-sm font-bold"
          >
            Continue to checkout <ArrowRight className="size-4" />
          </Button>
          <div className="mt-4 flex items-start gap-2 text-[10px] leading-4 text-muted-foreground">
            <ShieldCheck className="size-3.5 shrink-0 text-primary" /> The
            server recalculates inventory, fees, and the final estimate at
            checkout.
          </div>
        </div>
      </aside>

      <div className="fixed right-3 bottom-3 left-3 z-40 lg:hidden">
        <Button
          render={<Link href="/checkout" />}
          nativeButton={false}
          className="h-14 w-full justify-between rounded-lg bg-market-rail px-4 text-market-rail-ink shadow-xl"
        >
          <span className="text-left">
            <span className="block text-[9px] text-market-rail-ink/55 uppercase">
              Current estimate
            </span>
            <span className="text-sm font-bold">
              ৳{(subtotal + deliveryFee + 45).toLocaleString("en-US")}
            </span>
          </span>
          <span className="flex items-center gap-2 text-xs font-bold">
            Checkout <ArrowRight className="size-4" />
          </span>
        </Button>
      </div>
    </div>
  );
}
