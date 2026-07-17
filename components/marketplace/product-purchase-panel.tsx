"use client";

import type { FishProduct } from "@/components/landing/landing-data";
import { Button } from "@/components/ui/button";
import { Check, Clock3, Minus, Plus, Scale, ShieldCheck, ShoppingBag, Zap } from "lucide-react";
import { useState } from "react";

const cuts = [
  { name: "Whole", charge: 0, yield: "100%" },
  { name: "Cleaned", charge: 80, yield: "82–88%" },
  { name: "Steaks", charge: 120, yield: "76–84%" },
] as const;

export function ProductPurchasePanel({ product }: { product: FishProduct }) {
  const [weight, setWeight] = useState(1);
  const [cut, setCut] = useState<(typeof cuts)[number]>(cuts[0]);
  const [added, setAdded] = useState(false);
  const total = product.price * weight + cut.charge;

  return (
    <div className="lg:sticky lg:top-24">
      <div className="border-y border-border py-5">
        <div className="flex items-end justify-between gap-5">
          <div><p className="text-[10px] font-bold text-muted-foreground uppercase">Market price</p><p className="mt-1 font-heading text-4xl font-semibold text-ink">৳{product.price.toLocaleString("en-US")}<span className="ml-1 font-sans text-xs font-semibold text-muted-foreground">/ kg</span></p></div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-soft px-2.5 py-1.5 text-[10px] font-bold text-primary"><ShieldCheck className="size-3.5" /> {product.evidence}</span>
        </div>
      </div>

      <div className="py-5">
        <div className="flex items-center justify-between"><label htmlFor="weight" className="text-xs font-bold text-ink">Choose weight</label><span className="text-[10px] text-muted-foreground">{product.availableWeight} live stock</span></div>
        <div className="mt-2 flex h-12 items-center rounded-lg border border-border bg-surface">
          <Button type="button" variant="ghost" size="icon-lg" className="rounded-md" onClick={() => setWeight((value) => Math.max(0.5, value - 0.5))} aria-label="Decrease weight"><Minus className="size-4" /></Button>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2"><Scale className="size-4 text-action" /><input id="weight" type="number" min="0.5" step="0.5" value={weight} onChange={(event) => setWeight(Math.max(0.5, Number(event.target.value)))} className="w-14 bg-transparent text-center text-sm font-bold outline-none" /><span className="text-xs text-muted-foreground">kg</span></div>
          <Button type="button" variant="ghost" size="icon-lg" className="rounded-md" onClick={() => setWeight((value) => value + 0.5)} aria-label="Increase weight"><Plus className="size-4" /></Button>
        </div>
      </div>

      <fieldset className="border-t border-border py-5">
        <legend className="text-xs font-bold text-ink">Preparation</legend>
        <div className="mt-3 grid grid-cols-3 rounded-lg border border-border bg-surface p-1">
          {cuts.map((option) => (
            <button key={option.name} type="button" onClick={() => setCut(option)} className={`min-h-14 rounded-md px-2 text-left transition ${cut.name === option.name ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <span className="block text-xs font-bold">{option.name}</span><span className={`mt-1 block text-[9px] ${cut.name === option.name ? "text-primary-foreground/66" : "text-muted-foreground"}`}>{option.charge ? `+৳${option.charge}` : "No charge"}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">Expected edible yield: {cut.yield}. Final packed weight may vary.</p>
      </fieldset>

      <div className="border-y border-border py-4 text-xs">
        <p className="flex items-start gap-2 text-muted-foreground"><Clock3 className="mt-0.5 size-4 shrink-0 text-warning" /><span><strong className="text-ink">Earliest delivery</strong><br />{product.delivery}</span></p>
      </div>

      <div className="flex items-end justify-between py-5"><div><p className="text-[10px] font-bold text-muted-foreground uppercase">Estimated total</p><p className="mt-1 text-xs text-muted-foreground">Server recalculates at checkout</p></div><p className="font-heading text-3xl font-semibold text-ink">৳{total.toLocaleString("en-US")}</p></div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" className="h-12 rounded-md bg-surface text-sm font-bold" onClick={() => setAdded((value) => !value)}>{added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}{added ? "Added" : "Add to cart"}</Button>
        <Button type="button" className="h-12 rounded-md bg-coral text-sm font-bold text-white hover:bg-coral/88"><Zap className="size-4" /> Buy now</Button>
      </div>
    </div>
  );
}
