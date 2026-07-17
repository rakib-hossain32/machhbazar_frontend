import { sellers } from "@/components/landing/landing-data";
import { SectionHeading } from "@/components/landing/section-heading";
import { ArrowRight, BadgeCheck, Clock3, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function VerifiedSellersSection() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="verified-sellers-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div id="verified-sellers-title">
          <SectionHeading
            eyebrow="People behind the catch"
            title="Verified sellers, visible performance"
            description="Know who handles your fish and how consistently they fulfill orders before you buy."
            href="/shop?seller=verified"
            linkLabel="Explore all sellers"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {sellers.map((seller) => (
            <Link
              key={seller.slug}
              href={`/sellers/${seller.slug}`}
              className="group grid min-h-52 grid-cols-[118px_1fr] overflow-hidden rounded-lg border border-border bg-surface-muted transition hover:border-primary/45 hover:shadow-[0_18px_50px_rgba(19,42,45,0.08)] sm:grid-cols-[150px_1fr]"
            >
              <span className="relative block min-h-full overflow-hidden bg-secondary">
                <Image
                  src={seller.image}
                  alt={`${seller.name} seller location`}
                  fill
                  sizes="(max-width: 640px) 118px, 150px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex min-w-0 flex-col p-4 sm:p-5">
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-primary uppercase">
                  <BadgeCheck className="size-3.5" /> Verified seller
                </span>
                <span className="mt-3 font-heading text-2xl leading-[0.96] font-semibold text-ink">{seller.name}</span>
                <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5 text-coral" /> {seller.location}</span>
                <span className="mt-auto grid gap-1.5 border-t border-border pt-3 text-[11px] font-semibold text-ink/64">
                  <span className="flex items-center gap-1.5"><Star className="size-3.5 fill-warning text-warning" /> {seller.rating} · {seller.orders}</span>
                  <span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-action" /> {seller.fulfillment}</span>
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary">Visit storefront <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
