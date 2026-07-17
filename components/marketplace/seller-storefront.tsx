import { ProductCard } from "@/components/landing/product-card";
import { allProducts, getSeller } from "@/components/marketplace/market-data";
import { MarketPageHeader, MarketSection, SectionTitle, StatusBadge } from "@/components/marketplace/page-shell";
import { BadgeCheck, CalendarDays, Clock3, MapPin, ShieldCheck, Star, Store, Truck } from "lucide-react";
import Image from "next/image";

export function SellerStorefront({ slug }: { slug: string }) {
  const seller = getSeller(slug);
  return (
    <>
      <MarketPageHeader eyebrow="Seller storefront" title={seller.name} description="Public performance, active lots, and seller policies—without exposing private identity documents." breadcrumbs={[{ label: "Shop", href: "/shop" }, { label: seller.name }]} action={<StatusBadge icon={BadgeCheck}>Verified seller</StatusBadge>} />

      <MarketSection className="py-8 lg:py-12">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-border sm:min-h-[460px]">
          <Image src={seller.image} alt={`${seller.name} fish handling location`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-market-rail/48" />
          <div className="absolute right-5 bottom-5 left-5 grid gap-5 text-market-rail-ink sm:right-8 sm:bottom-8 sm:left-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="text-[10px] font-bold text-market-rail-ink/65 uppercase">Verified marketplace partner</p><h2 className="mt-2 font-heading text-4xl font-semibold sm:text-5xl">{seller.name}</h2><p className="mt-3 flex items-center gap-2 text-sm text-market-rail-ink/72"><MapPin className="size-4 text-coral" /> {seller.location}, Bangladesh</p></div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-market-rail-ink/18 sm:grid-cols-4">{[["Rating", seller.rating], ["Reviews", "486"], ["On time", seller.fulfillment.split(" ")[0]], ["Joined", "2024"]].map(([label, value]) => <div key={label} className="min-w-24 bg-market-rail/88 p-3"><p className="text-[9px] font-bold text-market-rail-ink/48 uppercase">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>)}</div>
          </div>
        </div>
      </MarketSection>

      <div className="border-y border-border bg-surface"><MarketSection className="grid gap-0 py-0 sm:grid-cols-4">{[{ icon: Star, label: "Buyer rating", value: `${seller.rating} / 5` }, { icon: Truck, label: "Fulfillment", value: seller.fulfillment }, { icon: Clock3, label: "Average acceptance", value: "8 minutes" }, { icon: ShieldCheck, label: "Dispute-free", value: "99.2%" }].map(({ icon: Icon, label, value }, index) => <div key={label} className={`flex items-center gap-3 py-5 ${index ? "sm:border-l sm:border-border sm:pl-5" : ""}`}><Icon className="size-4 text-primary" /><div><p className="text-[9px] font-bold text-muted-foreground uppercase">{label}</p><p className="mt-1 text-xs font-bold text-ink">{value}</p></div></div>)}</MarketSection></div>

      <MarketSection className="py-16 sm:py-20"><div className="flex items-end justify-between"><SectionTitle eyebrow="Active market" title="Fresh lots from this seller" description="Every product below is tied to currently available inventory." /><span className="text-[10px] font-bold text-muted-foreground uppercase">{allProducts.length} active listings</span></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{allProducts.slice(0, 6).map((product) => <ProductCard key={product.slug} product={product} compact />)}</div></MarketSection>

      <div className="border-y border-border bg-surface"><MarketSection className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20"><div><SectionTitle eyebrow="Seller story" title="Fish handled close to its source" /><p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">{seller.name} works with documented fishers and handlers, records incoming lot weight, and publishes public evidence before a catch appears in the marketplace. The storefront shows performance records that buyers can verify without exposing private KYC documents.</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{[{ icon: Store, label: "Operating base", value: seller.location }, { icon: CalendarDays, label: "Marketplace member", value: "Since March 2024" }, { icon: BadgeCheck, label: "Verification", value: "Identity + source" }].map(({ icon: Icon, label, value }) => <div key={label} className="border-t border-border pt-4"><Icon className="size-4 text-coral" /><p className="mt-3 text-[9px] font-bold text-muted-foreground uppercase">{label}</p><p className="mt-1 text-xs font-bold text-ink">{value}</p></div>)}</div></div><div><SectionTitle eyebrow="Store policies" title="Clear before checkout" /><div className="mt-6 divide-y divide-border border-y border-border">{[["Minimum order", "1 kg across active lots"], ["Preparation", "Whole, cleaned, and steaks"], ["Substitution", "Only with customer consent"], ["Quality report", "Within 2 hours of delivery"]].map(([label, value]) => <div key={label} className="flex justify-between gap-5 py-3 text-xs"><span className="text-muted-foreground">{label}</span><strong className="text-right text-ink">{value}</strong></div>)}</div></div></MarketSection></div>
    </>
  );
}
