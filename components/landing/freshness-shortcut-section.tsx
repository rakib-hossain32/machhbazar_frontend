import { ArrowRight, BadgeCheck, Clock3, FileCheck2, MapPinned, ScanLine, ThermometerSun } from "lucide-react";
import Link from "next/link";

const filters = [
  { label: "Caught under 6 hours", href: "/shop?freshness=under-6-hours", icon: Clock3 },
  { label: "Inspector verified", href: "/shop?verified=inspector", icon: BadgeCheck },
  { label: "Full catch passport", href: "/shop?passport=complete", icon: FileCheck2 },
  { label: "Cold-chain checked", href: "/shop?evidence=cold-chain", icon: ThermometerSun },
];

export function FreshnessShortcutSection() {
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="freshness-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div className="relative overflow-hidden rounded-lg bg-market-rail px-5 py-9 text-market-rail-ink sm:px-9 sm:py-11 lg:px-12">
          <div className="landing-grid-dark pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.17em] text-market-rail-ink/58 uppercase"><ScanLine className="size-4 text-coral" /> Freshness shortcuts</p>
              <h2 id="freshness-title" className="mt-4 max-w-xl font-heading text-4xl leading-[0.96] font-semibold sm:text-5xl">
                Shop by proof,<br /><span className="italic text-coral">not by promises.</span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-6 text-market-rail-ink/62 sm:text-base">
                Use evidence-first filters to find fish that matches the level of freshness and traceability you expect.
              </p>
              <Link href="/trace/MB-PD-240716-04" className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-market-rail-ink">
                Open a sample catch passport <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {filters.map((filter, index) => {
                const Icon = filter.icon;
                return (
                  <Link
                    key={filter.label}
                    href={filter.href}
                    className="group flex min-h-24 items-center gap-4 rounded-lg border border-market-rail-ink/12 bg-market-rail-ink/5 p-4 backdrop-blur transition hover:border-market-aqua hover:bg-market-aqua/15"
                  >
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-md ${index === 1 ? "bg-coral text-white" : "bg-market-rail-ink/10 text-market-rail-ink"}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold leading-5">{filter.label}</span>
                    <ArrowRight className="ml-auto size-4 shrink-0 text-market-rail-ink/40 transition group-hover:translate-x-1 group-hover:text-market-rail-ink" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-market-rail-ink/12 pt-5 text-[11px] font-semibold text-market-rail-ink/54">
            <span className="inline-flex items-center gap-2"><MapPinned className="size-4 text-coral" /> Source recorded</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-primary" /> Time stamped</span>
            <span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-action" /> Evidence reviewed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
