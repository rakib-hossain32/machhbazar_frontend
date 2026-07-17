"use client";

import { allProducts, catalogFilters } from "@/components/marketplace/market-data";
import { ProductCard } from "@/components/landing/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Filter, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const sortOptions = [
  ["recommended", "Recommended"],
  ["newest", "Newest catch"],
  ["freshness", "Highest freshness proof"],
  ["price-low", "Price: low to high"],
  ["price-high", "Price: high to low"],
  ["rating", "Seller rating"],
  ["best-selling", "Best selling"],
] as const;

export function ShopCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(4);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const products = useMemo(() => {
    const filtered = query
      ? allProducts.filter((product) => [product.name, product.species, product.origin, product.seller, product.evidence].some((value) => value.toLowerCase().includes(query)))
      : allProducts;
    const sort = searchParams.get("sort");
    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [query, searchParams]);

  const appliedFilters = Array.from(searchParams.entries()).filter(([key]) => key !== "sort" && key !== "q");

  function setParam(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || params.get(key) === value) params.delete(key);
    else params.set(key, value);
    router.push(`/shop?${params.toString()}`);
  }

  const filters = (
    <div className="divide-y divide-border">
      {catalogFilters.map((filter, index) => (
        <details key={filter.key} open={index < 4} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold text-ink">
            {filter.title}<ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 space-y-2.5">
            {filter.values.map((value) => {
              const checked = searchParams.get(filter.key) === value;
              return (
                <label key={value} className="flex cursor-pointer items-center gap-2.5 text-xs text-muted-foreground hover:text-ink">
                  <Checkbox checked={checked} onCheckedChange={() => setParam(filter.key, value)} />
                  {value}
                </label>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12 xl:px-0">
      <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center">
        <form action="/shop" className="flex h-11 min-w-0 flex-1 items-center rounded-lg border border-border bg-surface px-3 lg:max-w-xl">
          <Search className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <label htmlFor="catalog-search" className="sr-only">Search the fish catalog</label>
          <input id="catalog-search" name="q" defaultValue={searchParams.get("q") ?? ""} placeholder="Search fish, species, origin, or seller" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          <Button type="submit" size="sm" className="rounded-md">Search</Button>
        </form>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" className="h-10 flex-1 rounded-md lg:hidden" />}><SlidersHorizontal className="size-4" /> Filters</SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader><SheetTitle>Filter the market</SheetTitle><SheetDescription>Choose source, proof, preparation, and availability.</SheetDescription></SheetHeader>
              <div className="px-4 pb-6">{filters}</div>
            </SheetContent>
          </Sheet>

          <Select value={searchParams.get("sort") ?? "recommended"} onValueChange={(value) => setParam("sort", value ?? undefined)}>
            <SelectTrigger className="h-10 min-w-44 rounded-md bg-surface"><SelectValue /></SelectTrigger>
            <SelectContent align="end">
              {sortOptions.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {appliedFilters.length ? (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[10px] font-bold text-muted-foreground uppercase">Applied</span>
          {appliedFilters.map(([key, value]) => (
            <button key={key} type="button" onClick={() => setParam(key)} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-primary/20 bg-primary-soft px-2.5 text-[10px] font-bold text-primary">
              {value}<X className="size-3" />
            </button>
          ))}
          <Button render={<Link href="/shop" />} nativeButton={false} variant="ghost" size="sm" className="rounded-md text-xs"><RotateCcw className="size-3.5" /> Reset</Button>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden lg:block" aria-label="Catalog filters">
          <div className="sticky top-24 rounded-lg border border-border bg-surface px-4">
            <div className="flex items-center gap-2 border-b border-border py-4 text-sm font-bold text-ink"><Filter className="size-4 text-primary" /> Filter catch</div>
            {filters}
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="text-sm font-bold text-ink">{products.length} catches available</p><p className="mt-1 text-xs text-muted-foreground">Delivering to Dhaka City</p></div>
            <p className="hidden text-[10px] font-bold text-muted-foreground uppercase sm:block">Live inventory · Updated minutes ago</p>
          </div>

          {products.length ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.slice(0, visibleCount).map((product) => <ProductCard key={product.slug} product={product} compact />)}
              </div>
              {visibleCount < products.length ? (
                <div className="mt-8 flex justify-center"><Button variant="outline" className="h-11 rounded-md bg-surface px-5" onClick={() => setVisibleCount((count) => count + 3)}>Load more catches</Button></div>
              ) : null}
            </>
          ) : (
            <div className="border border-dashed border-border bg-surface px-6 py-16 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <h2 className="mt-4 font-heading text-3xl font-semibold text-ink">No catch matched that search.</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try Hilsa, Rohu, Padma, or a verified seller name.</p>
              <Button render={<Link href="/shop" />} nativeButton={false} className="mt-5 rounded-md">Browse all fish</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
