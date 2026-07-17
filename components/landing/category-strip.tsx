import { categories } from "@/components/landing/landing-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CategoryStrip() {
  return (
    <section className="border-y border-border bg-surface py-7" aria-labelledby="category-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-primary uppercase">Shop by water & preparation</p>
            <h2 id="category-title" className="mt-1 font-heading text-2xl font-semibold text-ink">Find your catch</h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1.5 text-xs font-bold text-ink sm:inline-flex">All categories <ArrowUpRight className="size-3.5" /></Link>
        </div>

        <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-1">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.query}`}
              className="group flex min-w-[210px] snap-start items-center gap-3 rounded-lg border border-border bg-surface-muted p-2.5 pr-4 transition hover:border-primary/45 hover:bg-primary-soft sm:min-w-0 sm:flex-1"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-secondary">
                <Image src={category.image} alt={`${category.name} selection`} fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{category.name}</span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">{category.count} available</span>
              </span>
              <ArrowUpRight className="ml-auto size-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
