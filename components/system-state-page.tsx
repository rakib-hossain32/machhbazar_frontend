"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Fish,
  Home,
  MapPinned,
  RefreshCw,
  Scale,
  ShieldCheck,
  Waves,
} from "lucide-react";
import Link from "next/link";

type SystemStatePageProps =
  | {
      variant: "not-found";
      reference?: never;
      onRetry?: never;
    }
  | {
      variant: "error";
      reference?: string;
      onRetry: () => void;
    };

const trustPoints = [
  { icon: ShieldCheck, label: "Verified sellers" },
  { icon: MapPinned, label: "Source trace" },
  { icon: Scale, label: "Exact weight" },
];

export function SystemStatePage(props: SystemStatePageProps) {
  const isNotFound = props.variant === "not-found";
  const code = isNotFound ? "404" : "500";

  return (
    <div className="relative isolate min-h-svh overflow-hidden bg-market-bg text-market-ink">
      <div
        className="hero-ledger-grid pointer-events-none absolute inset-0 opacity-45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-market-accent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10 xl:px-0">
        <header className="flex h-18 shrink-0 items-center justify-between border-b border-market-ink/15">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-market-ink"
            aria-label="Machh Bazar home"
          >
            <span className="flex size-9 items-center justify-center bg-market-rail text-market-rail-ink transition-transform group-hover:-rotate-3">
              <Fish className="size-5" aria-hidden="true" />
            </span>
            <span className="font-heading text-xl leading-none font-semibold sm:text-2xl">
              Machh Bazar
            </span>
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-market-ink/55 sm:text-xs">
            <span className="size-1.5 bg-market-accent" aria-hidden="true" />
            <span className="hidden sm:inline">Market status</span>
            <span className="font-mono text-market-ink">{code}</span>
          </div>
        </header>

        <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(28rem,1.12fr)] lg:gap-12 lg:py-12">
          <section className="max-w-2xl">
            <div className="hero-reveal flex items-center gap-3 text-[10px] font-bold uppercase text-market-aqua sm:text-xs">
              <span className="h-px w-7 bg-market-accent" aria-hidden="true" />
              {isNotFound ? "Route not found" : "Service interruption"}
            </div>

            <h1 className="hero-reveal hero-delay-1 mt-5 max-w-xl font-heading text-5xl leading-[0.9] font-semibold text-balance sm:text-6xl lg:text-7xl">
              {isNotFound ? (
                <>
                  This catch left{" "}
                  <em className="font-medium text-market-accent">no trace.</em>
                </>
              ) : (
                <>
                  The current broke{" "}
                  <em className="font-medium text-market-accent">mid-route.</em>
                </>
              )}
            </h1>

            <p className="hero-reveal hero-delay-2 mt-6 max-w-lg text-base leading-7 text-market-ink/65 sm:text-lg sm:leading-8">
              {isNotFound
                ? "The page may have moved, the listing may have closed, or the address may be incomplete."
                : "We could not complete that request. Your account and cart are safe, so you can retry or return home."}
            </p>

            <div className="hero-reveal hero-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              {isNotFound ? (
                <>
                  <Button
                    render={<Link href="/shop?sort=newest" />}
                    nativeButton={false}
                    size="lg"
                  >
                    <Fish data-icon="inline-start" aria-hidden="true" />
                    Browse today&apos;s catch
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </Button>
                  <Button
                    render={<Link href="/" />}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                  >
                    <Home data-icon="inline-start" aria-hidden="true" />
                    Back home
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={props.onRetry}>
                    <RefreshCw data-icon="inline-start" aria-hidden="true" />
                    Try again
                  </Button>
                  <Button
                    render={<Link href="/" />}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                  >
                    <Home data-icon="inline-start" aria-hidden="true" />
                    Go home
                  </Button>
                </>
              )}
            </div>

            {!isNotFound && props.reference ? (
              <p className="hero-reveal hero-delay-4 mt-6 font-mono text-[10px] uppercase text-market-ink/45">
                Reference: {props.reference}
              </p>
            ) : null}
          </section>

          <figure
            className="hero-reveal hero-delay-2 relative min-h-104 overflow-hidden py-8 sm:min-h-124 sm:py-10 lg:min-h-136"
            aria-label={
              isNotFound
                ? "Missing catch status 404"
                : "Interrupted market status 500"
            }
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-market-ink/15"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-market-ink/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 right-0 h-3/5 w-px bg-market-accent/70"
              aria-hidden="true"
            />

            <div className="absolute top-0 left-0 flex items-center gap-2 font-mono text-[9px] uppercase text-market-ink/45 sm:text-[10px]">
              <Waves className="size-4 text-market-accent" />
              River route / unresolved
            </div>
            <span className="absolute top-0 right-4 font-mono text-[9px] text-market-ink/45 sm:text-[10px]">
              23.5941 N
            </span>

            <div
              className="relative flex min-h-72 items-center justify-center pt-6 sm:min-h-88 lg:min-h-96"
              aria-hidden="true"
            >
              <span className="font-heading text-[clamp(7.2rem,15vw,11rem)] leading-none font-semibold text-market-ink">
                {code[0]}
              </span>

              <div className="relative -mx-3 flex size-[clamp(7.5rem,15vw,11.5rem)] shrink-0 items-center justify-center rounded-full border border-market-ink/25 bg-market-bg sm:-mx-5">
                <span className="absolute inset-2 rounded-full border border-market-aqua/55" />
                <span className="absolute inset-5 rounded-full border border-dashed border-market-ink/20" />
                <span className="state-route-line absolute left-[-32%] top-1/2 h-px w-[164%] border-t border-dashed border-market-accent" />
                <span className="absolute left-[-32%] top-[calc(50%-3px)] size-1.5 bg-market-accent" />
                <span className="absolute right-[-32%] top-[calc(50%-3px)] size-1.5 bg-market-accent" />

                <div className="state-catch-escape relative flex size-16 items-center justify-center bg-market-rail text-market-rail-ink sm:size-20">
                  <Fish className="size-9 sm:size-11" />
                  {!isNotFound ? (
                    <span className="absolute inset-x-2 top-1/2 h-px -rotate-12 bg-market-accent" />
                  ) : null}
                </div>
                <span className="absolute -right-2 -bottom-2 bg-market-accent px-2 py-1 font-mono text-[8px] font-bold text-market-accent-ink sm:text-[9px]">
                  {isNotFound ? "UNLISTED" : "OFFLINE"}
                </span>
              </div>

              <span className="font-heading text-[clamp(7.2rem,15vw,11rem)] leading-none font-semibold text-market-ink">
                {code[2]}
              </span>

              <div className="absolute right-0 bottom-3 flex origin-bottom-right -rotate-90 items-center gap-2 text-[9px] font-bold uppercase text-market-ink/45 sm:text-[10px]">
                <span className="h-px w-8 bg-market-accent" />
                Catch docket / {code}
              </div>
            </div>

            <figcaption className="relative grid grid-cols-[1fr_auto] border-y border-market-ink/15 bg-market-bg py-4 sm:grid-cols-[1fr_1fr_auto] sm:py-5">
              <div className="border-r border-market-ink/15 pr-4">
                <p className="font-mono text-[8px] font-bold uppercase text-market-ink/40 sm:text-[9px]">
                  Lot reference
                </p>
                <p className="mt-1 text-xs font-bold uppercase sm:text-sm">
                  MB / -- / --
                </p>
              </div>
              <div className="hidden border-r border-market-ink/15 px-5 sm:block">
                <p className="font-mono text-[9px] font-bold uppercase text-market-ink/40">
                  Last seen
                </p>
                <p className="mt-1 text-sm font-bold uppercase">
                  Beyond the ledger
                </p>
              </div>
              <div className="pl-4 text-right sm:pl-5">
                <p className="font-mono text-[8px] font-bold uppercase text-market-ink/40 sm:text-[9px]">
                  Status
                </p>
                <p className="mt-1 text-xs font-bold uppercase text-market-accent sm:text-sm">
                  {isNotFound ? "Not in market" : "Route paused"}
                </p>
              </div>
            </figcaption>
          </figure>
        </main>

        <footer className="grid shrink-0  gap-3 border-t border-market-ink/15 py-5 grid-cols-3 sm:gap-6 ">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs font-semibold text-market-ink/55 justify-center sm:text-"
            >
              <Icon className="size-4 text-market-aqua" aria-hidden="true" />
              {label}
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
}
