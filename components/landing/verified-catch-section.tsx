import { ProductCard } from "@/components/landing/product-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { verifiedCatch } from "@/components/landing/landing-data";

export function VerifiedCatchSection() {
  return (
    <section className="bg-surface-muted py-16 sm:py-20" aria-labelledby="verified-catch-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div id="verified-catch-title">
          <SectionHeading
            eyebrow="Landed today"
            title="Today’s verified catch"
            description="Every listing is connected to a live lot with source, time, available weight, and freshness evidence."
            href="/shop?verified=true&sort=newest"
            linkLabel="Browse verified fish"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {verifiedCatch.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
