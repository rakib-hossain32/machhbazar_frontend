import { SectionHeading } from "@/components/landing/section-heading";
import { ArrowRight, BadgeCheck, MapPinned, QrCode, Scale, ScanLine } from "lucide-react";
import Link from "next/link";

const trustSteps = [
  {
    number: "01",
    title: "Source",
    description: "Catch or harvest origin is attached to the lot, with seller evidence and time of record.",
    icon: MapPinned,
    color: "bg-primary text-white",
    meta: "Origin · catch time · seller",
  },
  {
    number: "02",
    title: "Weight",
    description: "Requested and packed weight stay visible, including cut yield and the final price calculation.",
    icon: Scale,
    color: "bg-action text-white",
    meta: "Requested · packed · invoiced",
  },
  {
    number: "03",
    title: "Proof",
    description: "Inspection, handling, and delivery events build an append-only passport you can revisit anytime.",
    icon: BadgeCheck,
    color: "bg-coral text-white",
    meta: "Checks · photos · timeline",
  },
] as const;

export function TrustSection() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="trust-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div id="trust-title">
          <SectionHeading
            eyebrow="How trust works"
            title="Three records. One accountable order."
            description="Machh Bazar makes the details that usually disappear in a fish purchase visible before and after checkout."
          />
        </div>

        <div className="relative grid gap-4 lg:grid-cols-3">
          <div className="absolute top-12 right-[16%] left-[16%] hidden h-px bg-border lg:block" />
          {trustSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className="relative rounded-lg border border-border bg-surface-muted p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className={`relative z-10 flex size-12 items-center justify-center rounded-md ${step.color}`}><Icon className="size-5" /></span>
                  <span className="font-mono text-[11px] font-bold text-muted-foreground">STEP / {step.number}</span>
                </div>
                <h3 className="mt-8 font-heading text-4xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                <p className="mt-7 border-t border-border pt-4 text-[10px] font-bold tracking-[0.11em] text-ink/52 uppercase">{step.meta}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-5 rounded-lg border border-primary/20 bg-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-white"><QrCode className="size-5" /></span>
            <div>
              <p className="text-sm font-bold text-ink">Every delivered lot keeps its public trace link.</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Scan the package QR or open the order record to see its complete evidence timeline.</p>
            </div>
          </div>
          <Link href="/trace/MB-PD-240716-04" className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary">
            <ScanLine className="size-4" /> View sample trace <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
