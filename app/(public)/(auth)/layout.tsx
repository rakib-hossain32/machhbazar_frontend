import { fishImages } from "@/components/landing/landing-data";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowLeft, BadgeCheck, Fish, MapPinned, Scale, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const trustSignals = [
  { label: "Verified seller network", value: "28 active", icon: BadgeCheck },
  { label: "Catch origins recorded", value: "12 regions", icon: MapPinned },
  { label: "Weight evidence retained", value: "Every order", icon: Scale },
] as const;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-surface-muted text-foreground">
      <div className="grid min-h-svh lg:grid-cols-[minmax(420px,0.92fr)_minmax(560px,1.08fr)]">
        <aside className="relative hidden min-h-svh overflow-hidden bg-market-rail text-market-rail-ink lg:block">
          <Image
            src={fishImages.market}
            alt="Fresh fish arranged for inspection at a trusted marketplace"
            fill
            priority
            sizes="46vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-market-rail/78" />
          <div className="landing-grid-dark pointer-events-none absolute inset-0 opacity-45" />

          <div className="relative flex min-h-svh flex-col px-10 py-9 xl:px-14 xl:py-11">
            <Link href="/" className="inline-flex w-fit items-center gap-3" aria-label="Machh Bazar home">
              <span className="flex size-10 items-center justify-center rounded-md bg-coral text-white">
                <Fish className="size-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-2xl font-semibold">Machh Bazar</span>
            </Link>

            <div className="my-auto max-w-xl py-16">
              <p className="flex items-center gap-2 text-[11px] font-bold text-market-rail-ink/62 uppercase">
                <ShieldCheck className="size-4 text-market-aqua" aria-hidden="true" />
                Private market access
              </p>
              <h1 className="mt-5 font-heading text-5xl leading-[0.94] font-semibold xl:text-6xl">
                Your market account,
                <span className="block italic text-coral">backed by proof.</span>
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-market-rail-ink/68 xl:text-base">
                Track catch origins, manage exact-weight orders, and return to trusted sellers from one secure place.
              </p>
            </div>

            <div className="border-t border-market-rail-ink/14">
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.label} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-market-rail-ink/14 py-3.5">
                    <Icon className="size-4 text-market-aqua" aria-hidden="true" />
                    <span className="text-xs font-semibold text-market-rail-ink/66">{signal.label}</span>
                    <span className="text-xs font-bold text-market-rail-ink">{signal.value}</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 font-mono text-[10px] text-market-rail-ink/42">23.8103° N · 90.4125° E · DHAKA</p>
          </div>
        </aside>

        <section className="flex min-h-svh flex-col">
          <header className="flex h-[74px] items-center justify-between border-b border-border px-5 sm:px-8 lg:px-10 xl:px-14">
            <Link href="/" className="inline-flex items-center gap-2.5 lg:hidden" aria-label="Machh Bazar home">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Fish className="size-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-2xl font-semibold text-ink">Machh Bazar</span>
            </Link>
            <Link href="/" className="group hidden items-center gap-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground lg:inline-flex">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Back to the market
            </Link>
            <ModeToggle />
          </header>

          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-10 xl:px-14">
            <div className="auth-enter w-full max-w-[520px]">{children}</div>
          </div>

          <footer className="flex flex-col gap-2 border-t border-border px-5 py-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 xl:px-14">
            <span>Secure account access · TLS encrypted</span>
            <span className="flex gap-4">
              <Link href="/policies/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/policies/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/contact" className="hover:text-foreground">Help</Link>
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}
