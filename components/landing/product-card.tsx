"use client";

import type { FishProduct } from "@/components/landing/landing-data";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock3,
  Heart,
  MapPin,
  Plus,
  Scale,
  ScanLine,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductCardProps = {
  product: FishProduct;
  priority?: boolean;
  compact?: boolean;
};

export function ProductCard({ product, priority = false, compact = false }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-[0_16px_45px_rgba(19,42,45,0.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/42 hover:shadow-[0_24px_70px_rgba(19,42,45,0.13)]">
      <div className="grid grid-cols-[34px_minmax(0,1fr)] border-b border-border">
        <div className="relative z-10 flex flex-col items-center bg-market-rail py-2.5 text-market-rail-ink">
          <ScanLine className="size-4 text-market-aqua" aria-hidden="true" />
          <span className="my-auto [writing-mode:vertical-rl] rotate-180 text-[8px] font-bold text-market-rail-ink/54 uppercase">
            Trace-ready catch
          </span>
          <span className="font-mono text-[9px] font-bold text-coral">LIVE</span>
        </div>

        <div className={`relative overflow-hidden bg-secondary ${compact ? "aspect-[1.55]" : "aspect-[1.42]"}`}>
          <Link href={`/fish/${product.slug}`} className="absolute inset-0" aria-label={`View ${product.name}`}>
            <Image
              src={product.image}
              alt={`${product.name} from ${product.origin}`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 43vw, 23vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.055]"
            />
          </Link>

          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-md border border-border/75 bg-card/92 px-2 py-1 text-[9px] font-bold text-card-foreground shadow-sm backdrop-blur">
            <Clock3 className="size-3 text-warning" aria-hidden="true" />
            {product.caughtAt}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setLiked((value) => !value)}
            aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={liked}
            title={liked ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-2.5 right-2.5 rounded-md border shadow-sm backdrop-blur ${
              liked
                ? "border-coral bg-coral text-white hover:bg-coral/90 hover:text-white"
                : "border-border/75 bg-card/92 text-card-foreground hover:bg-card hover:text-card-foreground"
            }`}
          >
            <Heart className={`size-4 ${liked ? "fill-current" : ""}`} aria-hidden="true" />
          </Button>

          <div className="absolute right-0 bottom-0 min-w-23 bg-coral px-2.5 py-1.5 text-right text-white shadow-[-6px_-6px_0_color-mix(in_srgb,var(--card)_82%,transparent)]">
            {product.previousPrice ? (
              <p className="text-[9px] font-semibold text-white/68 line-through">৳{product.previousPrice.toLocaleString("en-US")}</p>
            ) : null}
            <p className="font-heading text-xl leading-none font-semibold">৳{product.price.toLocaleString("en-US")}</p>
            <p className="mt-0.5 text-[9px] font-bold text-white/72 uppercase">Per kilogram</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="px-4 pt-4 pb-3">
          <Link href={`/fish/${product.slug}`} className="group/title block w-fit max-w-full">
            <h3 className="truncate font-heading text-2xl leading-none font-semibold text-ink transition-colors group-hover/title:text-primary">
              {product.name}
            </h3>
          </Link>

          <Link href={`/sellers/${product.seller.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}`} className="mt-2.5 flex min-w-0 items-center gap-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-primary">
            <BadgeCheck className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{product.seller}</span>
          </Link>
        </div>

        <div className="space-y-2 border-y border-border bg-surface-muted/70 px-4 py-3 text-[10px] text-muted-foreground">
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-coral" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate font-semibold text-ink" title={product.origin}>{product.origin}</span>
            <span className="h-3 w-px shrink-0 bg-border" />
            <Scale className="size-3.5 shrink-0 text-action" aria-hidden="true" />
            <span className="shrink-0 font-semibold text-ink">{product.availableWeight}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 border-t border-border pt-2">
            <BadgeCheck className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate font-bold text-primary">{product.evidence}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 border-t border-border pt-2">
            <Clock3 className="size-3.5 shrink-0 text-warning" aria-hidden="true" />
            <p className="truncate"><span className="font-bold text-ink">Delivery</span> · {product.delivery}</p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 border-t border-border bg-surface-muted/55 p-2.5">
          <Button
            render={<Link href={`/fish/${product.slug}`} />}
            nativeButton={false}
            variant="outline"
            className="h-10 justify-between rounded-md bg-card px-3 text-[11px] font-bold text-card-foreground hover:border-primary hover:bg-primary-soft hover:text-primary"
          >
            Inspect catch
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={() => setAdded((value) => !value)}
            className={`h-10 min-w-23 rounded-md px-3 text-[11px] font-bold ${
              added
                ? "bg-action text-action-foreground hover:bg-action/82"
                : "bg-primary text-primary-foreground hover:bg-primary/82"
            }`}
            aria-pressed={added}
          >
            {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingBag className="size-4" aria-hidden="true" />}
            {added ? "Added" : "Add"}
            {!added ? <Plus className="size-3" aria-hidden="true" /> : null}
          </Button>
        </div>
      </div>
    </article>
  );
}
