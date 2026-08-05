"use client";

import { ProductCard } from "@/components/landing/product-card";
import { CatalogSearch } from "@/components/marketplace/catalog-search";
import { CatalogFilterPanel } from "@/components/marketplace/catalog-filter-panel";
import type { CatalogFilterKey } from "@/components/marketplace/catalog-filter.types";
import {
  allProducts,
  catalogFilters,
} from "@/components/marketplace/market-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Compass,
  Fish,
  Radio,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
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

const sortItems = sortOptions.map(([value, label]) => ({ value, label }));

type CatalogFilterSheetProps = {
  activeCount: number;
  className: string;
  idPrefix: string;
  onFilterChange: (key: CatalogFilterKey, value?: string) => void;
  onReset: () => void;
  productCount: number;
  selectedValues: Partial<Record<CatalogFilterKey, string>>;
  side: "bottom" | "right";
};

function getShopHref(params: URLSearchParams) {
  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

function CatalogFilterSheet({
  activeCount,
  className,
  idPrefix,
  onFilterChange,
  onReset,
  productCount,
  selectedValues,
  side,
}: CatalogFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" className={cn("justify-start", className)} />
        }
      >
        <SlidersHorizontal data-icon="inline-start" />
        Catch compass
        {activeCount ? (
          <Badge variant="secondary" className="ml-auto">
            {activeCount}
          </Badge>
        ) : null}
      </SheetTrigger>
      <SheetContent
        side={side}
        showCloseButton={false}
        className={cn(
          "gap-0 overflow-hidden p-0",
          side === "bottom"
            ? "data-[side=bottom]:h-[92svh] data-[side=bottom]:rounded-t-3xl"
            : "sm:max-w-md",
        )}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Catch compass filters</SheetTitle>
          <SheetDescription>
            Filter fish by delivery, source, evidence, price, and preparation.
          </SheetDescription>
        </SheetHeader>
        <CatalogFilterPanel
          mode="sheet"
          idPrefix={idPrefix}
          activeCount={activeCount}
          selectedValues={selectedValues}
          onFilterChange={onFilterChange}
          onReset={onReset}
          headerAction={<span aria-hidden="true" className="size-7 shrink-0" />}
          footerAction={
            <Button type="button" size="sm" onClick={() => setOpen(false)}>
              View {productCount} catches
            </Button>
          }
        />
        <SheetClose
          render={
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              aria-label="Close catalog filters"
              className="absolute top-5 right-5"
              onClick={() => setOpen(false)}
            />
          }
        >
          <X />
          <span className="sr-only">Close catalog filters</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export function ShopCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(4);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const products = useMemo(() => {
    const filtered = query
      ? allProducts.filter((product) =>
          [
            product.name,
            product.species,
            product.origin,
            product.seller,
            product.evidence,
          ].some((value) => value.toLowerCase().includes(query)),
        )
      : allProducts;
    const sort = searchParams.get("sort");
    if (sort === "price-low")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high")
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [query, searchParams]);

  const selectedValues = useMemo(
    () =>
      Object.fromEntries(
        catalogFilters.flatMap((filter) => {
          const value = searchParams.get(filter.key);
          return value ? [[filter.key, value]] : [];
        }),
      ) as Partial<Record<CatalogFilterKey, string>>,
    [searchParams],
  );

  const appliedFilters = catalogFilters.flatMap((filter) => {
    const value = selectedValues[filter.key];
    return value ? [{ key: filter.key, title: filter.title, value }] : [];
  });
  const activeFilterCount = appliedFilters.length;

  function setParam(key: CatalogFilterKey, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || params.get(key) === value) params.delete(key);
    else params.set(key, value);
    router.push(getShopHref(params));
  }

  function setSort(value?: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "recommended") params.delete("sort");
    else params.set("sort", value);
    router.push(getShopHref(params));
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams.toString());
    catalogFilters.forEach(({ key }) => params.delete(key));
    router.push(getShopHref(params));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12 xl:px-0">
      <div className="grid gap-3 pb-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-stretch">
        <CatalogSearch
          defaultQuery={searchParams.get("q") ?? undefined}
          preservedParams={Array.from(searchParams.entries()).filter(
            ([key]) => key !== "q",
          )}
          resultCount={products.length}
        />

        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-[auto_minmax(15rem,18rem)] lg:block">
          <CatalogFilterSheet
            side="bottom"
            className="h-12 w-full min-w-0 sm:hidden"
            idPrefix="mobile-filter"
            activeCount={activeFilterCount}
            selectedValues={selectedValues}
            productCount={products.length}
            onFilterChange={setParam}
            onReset={resetFilters}
          />
          <CatalogFilterSheet
            side="right"
            className="hidden h-full min-h-20 sm:inline-flex lg:hidden"
            idPrefix="tablet-filter"
            activeCount={activeFilterCount}
            selectedValues={selectedValues}
            productCount={products.length}
            onFilterChange={setParam}
            onReset={resetFilters}
          />

          <FieldGroup className="h-full gap-0">
            <Field className="h-full min-h-24 justify-between gap-3 rounded-2xl border border-primary/20 bg-card px-3 py-3 shadow-[0_12px_32px_rgba(19,42,45,0.06)] sm:px-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary-soft font-mono text-[9px] font-bold text-primary">
                  02
                </span>
                <div className="min-w-0">
                  <FieldLabel
                    htmlFor="catalog-sort"
                    className="font-heading text-sm font-semibold"
                  >
                    Sort results
                  </FieldLabel>
                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">
                    Choose how products are ordered
                  </p>
                </div>
              </div>

              <Select
                items={sortItems}
                value={searchParams.get("sort") ?? "recommended"}
                onValueChange={setSort}
              >
                <SelectTrigger
                  id="catalog-sort"
                  className="h-10 w-full min-w-0 rounded-xl bg-background px-3 font-semibold shadow-xs"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" alignItemWithTrigger={false}>
                  <SelectGroup>
                    {sortOptions.map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </div>
      </div>

      <Separator />

      {appliedFilters.length ? (
        <section
          aria-label="Applied catalog filters"
          className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center"
        >
          <div className="flex shrink-0 items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
              <Compass className="size-3.5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[8px] font-bold text-muted-foreground uppercase">
                Your route
              </p>
              <p className="text-xs font-bold">{activeFilterCount} marked</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap gap-2">
            {appliedFilters.map(({ key, title, value }) => (
              <Button
                key={key}
                type="button"
                onClick={() => setParam(key)}
                variant="secondary"
                size="sm"
                aria-label={`Remove ${title}: ${value}`}
              >
                <span className="max-w-36 truncate">{value}</span>
                <X data-icon="inline-end" />
              </Button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="self-start sm:self-auto"
          >
            <RotateCcw data-icon="inline-start" />
            Clear route
          </Button>
        </section>
      ) : (
        <div className="py-3" />
      )}

      <div className="grid gap-7 lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)] xl:gap-9">
        <aside className="hidden lg:block" aria-label="Catalog filters">
          <div className="sticky top-24">
            <CatalogFilterPanel
              idPrefix="desktop-filter"
              activeCount={activeFilterCount}
              selectedValues={selectedValues}
              onFilterChange={setParam}
              onReset={resetFilters}
            />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full border border-primary/20 bg-primary-soft text-primary">
                <Fish className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-xl font-semibold text-ink">
                  {products.length} catches available
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Delivering to Dhaka City
                </p>
              </div>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex">
              <Radio data-icon="inline-start" />
              Live inventory
            </Badge>
          </div>

          {products.length ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.slice(0, visibleCount).map((product) => (
                  <ProductCard key={product.slug} product={product} compact />
                ))}
              </div>
              {visibleCount < products.length ? (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((count) => count + 3)}
                  >
                    <Fish data-icon="inline-start" />
                    Load more catches
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <Empty className="min-h-96 border bg-surface">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search />
                </EmptyMedia>
                <EmptyTitle>No catch matched that route</EmptyTitle>
                <EmptyDescription>
                  Try Hilsa, Rohu, Padma, or a verified seller name.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  render={<Link href="/shop" />}
                  nativeButton={false}
                >
                  Browse all fish
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </div>
    </div>
  );
}
