"use client";

import { allProducts } from "@/components/marketplace/market-data";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  BellRing,
  Clock3,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function WishlistView() {
  const [saved, setSaved] = useState(() => allProducts.slice(0, 4));
  const [added, setAdded] = useState<string[]>([]);

  if (!saved.length) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:px-10 xl:px-0">
        <Heart className="mx-auto size-9 text-muted-foreground" />
        <h2 className="mt-5 font-heading text-4xl font-semibold text-ink">
          Your wishlist is clear.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Save a catch to compare its next verified lot and current price.
        </p>
        <Button
          render={<Link href="/shop" />}
          nativeButton={false}
          className="mt-6 rounded-md"
        >
          Browse fresh fish
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12 xl:px-0">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-5">
        <div>
          <p className="text-sm font-bold text-ink">
            {saved.length} saved catches
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Price, availability, and new-lot evidence update with the live
            market.
          </p>
        </div>
        <span className="hidden items-center gap-2 text-[10px] font-bold text-primary uppercase sm:flex">
          <BellRing className="size-4" /> Fresh lot alerts active
        </span>
      </div>
      <div className="space-y-4">
        {saved.map((product, index) => {
          const isAdded = added.includes(product.slug);
          return (
            <article
              key={product.slug}
              className="grid gap-4 overflow-hidden rounded-lg border border-border bg-surface p-4 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:p-5"
            >
              <Link
                href={`/fish/${product.slug}`}
                className="relative aspect-[1.25] overflow-hidden rounded-lg bg-secondary sm:aspect-square"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-card/92 px-2 py-1 text-[9px] font-bold text-primary">
                  {product.caughtAt}
                </span>
              </Link>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/fish/${product.slug}`}
                      className="font-heading text-2xl font-semibold text-ink hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {product.origin}
                    </p>
                  </div>
                  <span className="rounded-md bg-primary-soft px-2 py-1 text-[9px] font-bold text-primary">
                    {product.evidence}
                  </span>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <BadgeCheck className="size-3.5 text-primary" />{" "}
                  {product.seller}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-muted-foreground">
                  <span>
                    <strong className="text-ink">Current price:</strong> ৳
                    {product.price.toLocaleString("en-US")}/kg
                  </span>
                  <span>
                    <strong className="text-ink">Available:</strong>{" "}
                    {product.availableWeight}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="size-3 text-warning" />{" "}
                    {product.delivery}
                  </span>
                </div>
                {index < 2 ? (
                  <p className="mt-3 flex items-center gap-2 text-[10px] font-bold text-coral">
                    <BellRing className="size-3.5" /> New verified lot added
                    today
                  </p>
                ) : null}
              </div>
              <div className="flex gap-2 self-end sm:flex-col">
                <Button
                  type="button"
                  className="h-10 flex-1 rounded-md sm:min-w-32"
                  onClick={() =>
                    setAdded((current) =>
                      current.includes(product.slug)
                        ? current
                        : [...current, product.slug],
                    )
                  }
                >
                  <ShoppingBag className="size-4" />{" "}
                  {isAdded ? "Added" : "Move to cart"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 flex-1 rounded-md bg-surface text-muted-foreground sm:min-w-32"
                  onClick={() =>
                    setSaved((current) =>
                      current.filter((item) => item.slug !== product.slug),
                    )
                  }
                >
                  <Trash2 className="size-4" /> Remove
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
