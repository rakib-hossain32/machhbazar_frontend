import CatchCurrent from "@/components/catch-current";
import { ArrowRight, BadgeCheck, Clock3, MapPin, Search } from "lucide-react";
import Link from "next/link";

const quickSearches = ["Hilsa", "Rohu", "Prawn", "Sea bass"];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-245 overflow-hidden bg-market-bg text-market-ink transition-colors duration-500 sm:min-h-235 lg:min-h-[calc(100svh-72px)] lg:max-h-205"
    >
      <div className="pointer-events-none absolute inset-0 hero-ledger-grid opacity-55" />
      <div className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-market-ink/12 lg:block" />

      <div className="relative mx-auto grid min-h-245 w-full max-w-7xl grid-rows-[360px_auto_auto] px-5 sm:min-h-235 sm:grid-rows-[420px_auto_auto] sm:px-8 lg:min-h-[calc(100svh-72px)] lg:max-h-205 lg:grid-cols-[0.92fr_1.08fr] lg:grid-rows-[1fr_auto] lg:px-10 xl:px-0">
        <div className="relative z-10 order-2 flex flex-col justify-center pt-14 pb-8 sm:pt-16 lg:order-1 lg:pr-14 lg:pb-12">
          <div className="hero-reveal flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span className="inline-flex items-center gap-2 text-market-accent">
              <span className="size-1.5 rounded-full bg-market-accent shadow-[0_0_0_5px_color-mix(in_srgb,var(--market-accent)_14%,transparent)]" />
              Live market
            </span>
            <span className="h-px w-10 bg-market-ink/20" />
            <span className="text-market-ink/48">Dhaka · 07:42</span>
          </div>

          <h1
            id="hero-title"
            className="hero-reveal hero-delay-1 mt-9 max-w-160 font-heading text-[4rem] leading-[0.92] font-semibold tracking-[-0.055em] sm:text-[5.8rem] lg:text-[6rem]"
          >
            The catch
            <span className="block pl-[0.25em] italic text-market-accent">
              has a history.
            </span>
          </h1>

          <div className="hero-reveal hero-delay-2 mt-9 grid max-w-147.5 grid-cols-[3px_1fr] gap-5">
            <span className="h-full bg-market-aqua" />
            <div>
              <p className="max-w-125 text-base leading-7 text-market-ink/70 sm:text-lg sm:leading-8">
                Fresh fish with a verifiable journey—from water to weight to
                your doorstep. No guesswork. No hidden catch.
              </p>
              <Link
                href="/trace/demo"
                className="group mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase transition-colors hover:text-market-accent"
              >
                Trace a real catch
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="hero-reveal hero-delay-3 mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-market-ink/58">
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-market-aqua" /> 28 verified
              sellers
            </span>
            <span className="flex items-center gap-2">
              <Clock3 className="size-4 text-market-accent" /> Same-day delivery
            </span>
          </div>
        </div>

        <div className="relative order-1 -mx-5 min-h-90 overflow-hidden sm:-mx-8 lg:order-2 lg:mx-0 lg:min-h-0">
          <div className="absolute top-6 right-5 z-10 flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] text-market-ink/45 uppercase sm:right-8 lg:top-8 lg:right-0">
            <span className="size-1.5 bg-market-aqua" />
            Current / Padma 04
          </div>
          <CatchCurrent />
          <div className="absolute bottom-5 left-5 z-10 max-w-36 sm:left-8 lg:bottom-8 lg:left-10">
            <p className="text-[9px] font-bold tracking-[0.18em] text-market-ink/42 uppercase">
              Today&apos;s signal
            </p>
            <p className="mt-1 font-heading text-2xl leading-none font-semibold">
              Padma Hilsa
            </p>
            <p className="mt-1 text-[11px] text-market-ink/52">
              Caught at 04:20 · Mawa
            </p>
          </div>
        </div>

        <div className="relative z-20 order-3 -mx-5 border-t border-market-ink/20 bg-market-rail px-5 py-5 text-market-rail-ink transition-colors duration-500 sm:-mx-8 sm:px-8 lg:col-span-2 lg:mx-0 lg:grid lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-0 lg:px-0 lg:py-0">
          <div className="mb-4 flex items-center gap-3 lg:mb-0 lg:h-23 lg:border-r lg:border-market-rail-ink/15 lg:px-6">
            <MapPin className="size-4 text-market-aqua" aria-hidden="true" />
            <div>
              <p className="text-[9px] font-bold tracking-[0.16em] text-market-rail-ink/48 uppercase">
                Delivering to
              </p>
              <p className="mt-0.5 text-sm font-semibold">Dhaka City</p>
            </div>
          </div>

          <form
            action="/shop"
            className="flex min-w-0 items-center lg:h-23 lg:px-6"
          >
            <Search
              className="mr-3 size-5 shrink-0 text-market-aqua"
              aria-hidden="true"
            />
            <label className="sr-only" htmlFor="catch-search">
              Search today&apos;s market
            </label>
            <input
              id="catch-search"
              name="q"
              type="search"
              placeholder="What are you cooking today?"
              className="min-w-0 flex-1 bg-transparent text-base font-medium text-market-rail-ink outline-none placeholder:text-market-rail-ink/42 sm:text-lg"
            />
            <button
              type="submit"
              className="flex size-11 shrink-0 items-center justify-center bg-market-accent text-market-accent-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-market-rail-ink lg:ml-5"
              aria-label="Search the market"
            >
              <ArrowRight className="size-5" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-market-rail-ink/12 pt-4 lg:mt-0 lg:h-23 lg:border-t-0 lg:border-l lg:px-5 lg:pt-0">
            {quickSearches.map((item) => (
              <Link
                key={item}
                href={`/shop?q=${item.toLowerCase().replace(" ", "+")}`}
                className="border border-market-rail-ink/18 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.08em] text-market-rail-ink/62 uppercase transition-colors hover:border-market-rail-ink/45 hover:text-market-rail-ink"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
