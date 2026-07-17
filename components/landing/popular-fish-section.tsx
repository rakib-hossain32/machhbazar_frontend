import { popularFish } from "@/components/landing/landing-data";
import { ProductCard } from "@/components/landing/product-card";
import { SectionHeading } from "@/components/landing/section-heading";

export function PopularFishSection() {
  return (
    <section className="bg-surface-muted py-16 sm:py-20" aria-labelledby="popular-fish-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div id="popular-fish-title">
          <SectionHeading
            eyebrow="Most ordered this week"
            title="Popular around Dhaka"
            description="Reliable household favorites selected from lots that can reach Dhaka within the shown delivery window."
            href="/shop?sort=best-selling"
            linkLabel="See best sellers"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {popularFish.map((product) => <ProductCard key={product.slug} product={product} compact />)}
        </div>
      </div>
    </section>
  );
}
