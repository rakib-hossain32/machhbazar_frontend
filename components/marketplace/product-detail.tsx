import { fishImages } from "@/components/landing/landing-data";
import { ProductCard } from "@/components/landing/product-card";
import { allProducts, getProduct } from "@/components/marketplace/market-data";
import { MarketPageHeader, MarketSection, SectionTitle, StatusBadge } from "@/components/marketplace/page-shell";
import { ProductPurchasePanel } from "@/components/marketplace/product-purchase-panel";
import { ArrowRight, BadgeCheck, ChefHat, FileCheck2, MapPin, PackageCheck, ShieldCheck, Star, ThermometerSun, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const traceEvents = [
    { time: "04:20", title: "Catch recorded", detail: product.origin, icon: MapPin },
    { time: "05:10", title: "Source evidence uploaded", detail: "Boat and handler records attached", icon: FileCheck2 },
    { time: "06:05", title: "Quality check passed", detail: "Visual, smell, and temperature evidence", icon: ThermometerSun },
    { time: "07:15", title: "Lot opened for sale", detail: product.availableWeight + " available", icon: PackageCheck },
  ];

  return (
    <>
      <MarketPageHeader eyebrow="Live lot" title={product.name} description={`${product.species} · ${product.origin}`} breadcrumbs={[{ label: "Shop", href: "/shop" }, { label: product.name }]} action={<StatusBadge icon={BadgeCheck}>{product.evidence}</StatusBadge>} />

      <MarketSection className="grid gap-10 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
        <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-border bg-secondary sm:min-h-[570px]"><Image src={product.image} alt={`${product.name}, current verified lot`} fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" /><div className="absolute bottom-4 left-4 rounded-md bg-market-rail/92 px-3 py-2 text-market-rail-ink"><p className="text-[9px] font-bold text-market-rail-ink/56 uppercase">Current lot</p><p className="mt-1 text-sm font-bold">MB–PD–0716–04</p></div></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            {[fishImages.market, fishImages.river].map((image, index) => <div key={image} className="relative min-h-32 overflow-hidden rounded-lg border border-border bg-secondary"><Image src={image} alt={index === 0 ? `${product.name} inspection view` : `${product.origin} source view`} fill sizes="150px" className="object-cover" /><span className="absolute right-2 bottom-2 rounded-md bg-card/92 px-2 py-1 text-[9px] font-bold text-card-foreground">{index === 0 ? "Inspection" : "Source"}</span></div>)}
          </div>
        </div>
        <ProductPurchasePanel product={product} />
      </MarketSection>

      <div className="border-y border-border bg-surface">
        <MarketSection className="grid gap-0 py-0 sm:grid-cols-3">
          {[{ label: "Available lots", value: "3 selectable", icon: PackageCheck }, { label: "Source confidence", value: "Complete", icon: ShieldCheck }, { label: "Seller fulfillment", value: "98% on time", icon: Truck }].map(({ label, value, icon: Icon }, index) => <div key={label} className={`flex items-center gap-3 py-5 ${index ? "sm:border-l sm:border-border sm:pl-6" : ""}`}><Icon className="size-5 text-primary" /><div><p className="text-[9px] font-bold text-muted-foreground uppercase">{label}</p><p className="mt-1 text-sm font-bold text-ink">{value}</p></div></div>)}
        </MarketSection>
      </div>

      <MarketSection className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionTitle eyebrow="Catch passport" title="A record that travels with the fish" description="Events are append-only. Corrections add a new disclosure without erasing the original record." />
          <div className="border-t border-border">
            {traceEvents.map(({ time, title, detail, icon: Icon }, index) => <div key={title} className="grid grid-cols-[54px_34px_1fr] gap-3 border-b border-border py-4"><span className="font-mono text-[10px] font-bold text-muted-foreground">{time}</span><span className={`flex size-7 items-center justify-center rounded-md ${index === traceEvents.length - 1 ? "bg-coral text-white" : "bg-primary-soft text-primary"}`}><Icon className="size-3.5" /></span><div><p className="text-sm font-bold text-ink">{title}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div></div>)}
            <Link href="/trace/MB-PD-0716-04" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Open full public trace <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </MarketSection>

      <div className="border-y border-border bg-surface">
        <MarketSection className="grid gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div><SectionTitle eyebrow="Freshness evidence" title="Proof, broken down" /><div className="mt-8 space-y-5">{[{ label: "Source record", value: 100, tone: "bg-primary" }, { label: "Catch-time confidence", value: 94, tone: "bg-action" }, { label: "Inspection completeness", value: 88, tone: "bg-coral" }, { label: "Cold handling", value: 91, tone: "bg-warning" }].map((item) => <div key={item.label}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-ink">{item.label}</span><span className="font-mono text-muted-foreground">{item.value}%</span></div><div className="h-1.5 bg-muted"><div className={`h-full ${item.tone}`} style={{ width: `${item.value}%` }} /></div></div>)}</div></div>
          <div className="relative min-h-80 overflow-hidden rounded-lg"><Image src={fishImages.river} alt={`Source landscape near ${product.origin}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><div className="absolute right-4 bottom-4 left-4 bg-market-rail/92 p-4 text-market-rail-ink"><p className="flex items-center gap-2 text-xs font-bold"><MapPin className="size-4 text-coral" /> {product.origin}</p><p className="mt-2 text-[11px] leading-5 text-market-rail-ink/65">Catch coordinates and public source description are recorded without exposing private handler data.</p></div></div>
        </MarketSection>
      </div>

      <MarketSection className="grid gap-8 py-16 lg:grid-cols-3 lg:py-20">
        <div><SectionTitle eyebrow="Preparation" title="Cut, charge, and probable yield" /><div className="mt-6 border-t border-border">{[["Whole", "৳0", "100%"], ["Cleaned", "৳80", "82–88%"], ["Steaks", "৳120", "76–84%"]].map((row) => <div key={row[0]} className="grid grid-cols-3 border-b border-border py-3 text-xs"><span className="font-bold text-ink">{row[0]}</span><span className="text-center text-muted-foreground">{row[1]}</span><span className="text-right font-semibold text-primary">{row[2]} yield</span></div>)}</div></div>
        <div><SectionTitle eyebrow="Nutrition" title="Naturally rich protein" /><dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">{[["Energy", "206 kcal"], ["Protein", "22 g"], ["Omega-3", "2.1 g"], ["Serving", "100 g"]].map(([term, value]) => <div key={term} className="bg-surface p-4"><dt className="text-[9px] font-bold text-muted-foreground uppercase">{term}</dt><dd className="mt-1 text-sm font-bold text-ink">{value}</dd></div>)}</dl></div>
        <div><SectionTitle eyebrow="Seller" title={product.seller} /><div className="mt-6 space-y-3 text-xs text-muted-foreground"><p className="flex justify-between border-b border-border pb-3"><span>Rating</span><strong className="flex items-center gap-1 text-ink"><Star className="size-3.5 fill-warning text-warning" /> 4.9 / 5</strong></p><p className="flex justify-between border-b border-border pb-3"><span>On-time fulfillment</span><strong className="text-ink">98%</strong></p><p className="flex justify-between border-b border-border pb-3"><span>Orders completed</span><strong className="text-ink">1,842</strong></p></div><Link href="/sellers/mawa-river-collective" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-primary">View storefront <ArrowRight className="size-3.5" /></Link></div>
      </MarketSection>

      <div className="bg-market-rail text-market-rail-ink">
        <MarketSection className="grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="flex items-center gap-2 text-[10px] font-bold text-market-aqua uppercase"><ChefHat className="size-4" /> Cooking match</p><h2 className="mt-3 font-heading text-4xl font-semibold">Mustard {product.name}, weeknight style</h2><p className="mt-3 max-w-xl text-sm text-market-rail-ink/62">A focused recipe designed around the fish’s cut, fat content, and current lot size.</p></div><Link href="/recipes/mustard-hilsa" className="inline-flex h-11 items-center gap-2 rounded-md bg-coral px-5 text-sm font-bold text-white">Open recipe <ArrowRight className="size-4" /></Link></MarketSection>
      </div>

      <MarketSection className="py-16 sm:py-20"><div className="flex items-end justify-between"><SectionTitle eyebrow="Verified reviews" title="What recent buyers recorded" /><div className="flex items-center gap-1 text-sm font-bold text-ink"><Star className="size-4 fill-warning text-warning" /> 4.9 · 128 reviews</div></div><div className="mt-8 grid gap-4 md:grid-cols-2">{["The packed weight and final invoice matched exactly. The fish arrived clean and cold.", "The public trace made it easy to choose between two similar Hilsa listings."].map((quote, index) => <blockquote key={quote} className="rounded-lg border border-border bg-surface p-6"><p className="font-heading text-2xl leading-8 text-ink">“{quote}”</p><footer className="mt-5 text-xs font-bold text-muted-foreground">{index ? "Rafi Ahmed · Verified order" : "Nadia Rahman · Verified order"}</footer></blockquote>)}</div></MarketSection>

      <div className="border-t border-border bg-surface"><MarketSection className="py-16"><div className="flex items-end justify-between"><SectionTitle eyebrow="More from the market" title="Related fresh catch" /><Link href="/shop" className="text-xs font-bold text-primary">View catalog</Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{allProducts.filter((item) => item.slug !== product.slug).slice(0, 3).map((item) => <ProductCard key={item.slug} product={item} compact />)}</div><div className="mt-8 flex items-start gap-3 border-t border-border pt-5 text-xs text-muted-foreground"><ShieldCheck className="size-4 shrink-0 text-primary" /><p><strong className="text-ink">Quality promise:</strong> report a verified quality issue within the stated window for review under our refund and replacement policy. <Link href="/policies/refund" className="font-bold text-primary">Read policy</Link></p></div></MarketSection></div>
    </>
  );
}
