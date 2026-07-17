import { fishImages } from "@/components/landing/landing-data";
import { MarketPageHeader, MarketSection, SectionTitle, StatusBadge } from "@/components/marketplace/page-shell";
import { AlertTriangle, ArrowRight, BadgeCheck, Check, FileCheck2, MapPin, PackageCheck, QrCode, Scale, ShieldCheck, ThermometerSun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TracePage({ lotCode }: { lotCode: string }) {
  const events = [
    { date: "16 Jul · 04:20", title: "Catch event recorded", actor: "Mawa River Collective", detail: "Padma Hilsa caught near Mawa handling zone.", icon: MapPin },
    { date: "16 Jul · 05:10", title: "Initial weight accepted", actor: "Seller record", detail: "31.4 kg entered with scale evidence.", icon: Scale },
    { date: "16 Jul · 06:05", title: "Inspection completed", actor: "Verified inspector", detail: "Grade A · visual, smell, and temperature checks passed.", icon: BadgeCheck },
    { date: "16 Jul · 07:15", title: "Lot activated", actor: "Marketplace system", detail: "14.8 kg currently available for customer orders.", icon: PackageCheck },
  ];
  return (
    <>
      <MarketPageHeader eyebrow="Public catch passport" title="Padma Hilsa trace record" description={`Lot ${lotCode} · Tenualosa ilisha`} breadcrumbs={[{ label: "Trace" }, { label: lotCode }]} action={<StatusBadge icon={ShieldCheck}>Inspector verified</StatusBadge>} />
      <MarketSection className="grid gap-8 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-12">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-border bg-surface p-5"><div className="flex aspect-square items-center justify-center bg-surface-muted"><QrCode className="size-36 text-ink" aria-label="QR code representation for this public trace page" /></div><p className="mt-4 text-center font-mono text-xs font-bold text-ink">{lotCode}</p><p className="mt-2 text-center text-[10px] text-muted-foreground">Scan the package code to return to this append-only public record.</p></div>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary-soft p-4"><p className="flex items-center gap-2 text-xs font-bold text-primary"><FileCheck2 className="size-4" /> Data completeness: 94%</p><div className="mt-3 h-1.5 bg-primary/12"><div className="h-full w-[94%] bg-primary" /></div></div>
        </aside>

        <div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">{[["Fish", "Padma Hilsa"], ["Scientific identity", "Tenualosa ilisha"], ["Origin", "Mawa, Padma River"], ["Verification level", "Inspector verified"], ["Catch time", "16 Jul 2026 · 04:20"], ["Current status", "Available for sale"]].map(([label, value]) => <div key={label} className="bg-surface p-4"><p className="text-[9px] font-bold text-muted-foreground uppercase">{label}</p><p className="mt-1.5 text-sm font-bold text-ink">{value}</p></div>)}</div>

          <div className="mt-10"><SectionTitle eyebrow="Chronological trace" title="What happened to this lot" /><div className="mt-6 border-t border-border">{events.map(({ date, title, actor, detail, icon: Icon }, index) => <article key={title} className="grid grid-cols-[34px_1fr] gap-4 border-b border-border py-5"><span className={`flex size-8 items-center justify-center rounded-md ${index === events.length - 1 ? "bg-coral text-white" : "bg-primary-soft text-primary"}`}><Icon className="size-4" /></span><div><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-bold text-ink">{title}</h3><time className="font-mono text-[9px] text-muted-foreground">{date}</time></div><p className="mt-1 text-[10px] font-bold text-primary uppercase">{actor}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p></div></article>)}</div></div>
        </div>
      </MarketSection>

      <div className="border-y border-border bg-surface"><MarketSection className="grid gap-10 py-16 lg:grid-cols-2"><div><SectionTitle eyebrow="Quality checks" title="Inspection evidence" /><div className="mt-6 divide-y divide-border border-y border-border">{[{ icon: ThermometerSun, label: "Surface temperature", value: "3.8°C · Passed" }, { icon: Check, label: "Visual and smell", value: "Grade A · Passed" }, { icon: Scale, label: "Measured weight", value: "31.4 kg · Evidence attached" }].map(({ icon: Icon, label, value }) => <div key={label} className="flex items-center gap-3 py-4"><Icon className="size-4 text-primary" /><span className="text-xs text-muted-foreground">{label}</span><strong className="ml-auto text-xs text-ink">{value}</strong></div>)}</div></div><div><SectionTitle eyebrow="Public evidence" title="Source thumbnails" /><div className="mt-6 grid grid-cols-3 gap-3">{[fishImages.market, fishImages.river, fishImages.hilsa].map((image, index) => <div key={image} className="relative aspect-square overflow-hidden rounded-lg border border-border"><Image src={image} alt={["Inspection evidence", "Catch origin evidence", "Lot product evidence"][index]} fill sizes="180px" className="object-cover" /></div>)}</div><p className="mt-3 text-[10px] text-muted-foreground">Private identity and KYC documents are intentionally excluded.</p></div></MarketSection></div>

      <MarketSection className="py-12"><div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/8 p-5"><AlertTriangle className="size-5 shrink-0 text-warning" /><div><p className="text-sm font-bold text-ink">Correction disclosure</p><p className="mt-2 text-xs leading-5 text-muted-foreground">No corrections have been added to this lot. If a record changes, the original event remains visible and a new correction event is appended.</p></div></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/fish/padma-hilsa-premium" className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground">View product <ArrowRight className="size-3.5" /></Link><Link href="/sellers/mawa-river-collective" className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-4 text-xs font-bold text-ink">View seller <ArrowRight className="size-3.5" /></Link></div></MarketSection>
    </>
  );
}
