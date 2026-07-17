import { ArrowUpRight, BadgeCheck, Fish, MapPinned, Scale } from "lucide-react";
import Link from "next/link";

const footerGroups = [
  {
    title: "Marketplace",
    links: [
      { name: "Shop fish", href: "/shop" },
      { name: "Today’s catch", href: "/shop?sort=newest" },
      { name: "Recipes", href: "/recipes" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "Refund policy", href: "/policies/refund" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Become a seller", href: "/seller/onboarding" },
      { name: "Privacy policy", href: "/policies/privacy" },
      { name: "Terms of service", href: "/policies/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-market-ink/15 bg-market-bg text-market-ink transition-colors duration-500">
      <div className="hero-ledger-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div className="grid gap-8 border-b border-market-ink/15 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-market-aqua">
              <span className="size-1.5 bg-market-accent" />
              Market ledger / Bangladesh
            </div>
            <h2 className="mt-5 max-w-2xl font-heading text-4xl leading-none font-semibold sm:text-5xl">
              From water to weight,
              <span className="block italic text-market-accent">nothing hidden.</span>
            </h2>
          </div>

          <Link
            href="/shop?sort=newest"
            className="group inline-flex h-12 w-fit items-center gap-3 bg-market-accent px-5 text-sm font-bold text-market-accent-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-market-ink"
          >
            Browse today’s catch
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 py-10 lg:grid-cols-[1.35fr_0.7fr_0.7fr_0.8fr] lg:gap-14 lg:py-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Machh Bazar home">
              <span className="flex size-9 items-center justify-center bg-market-ink text-market-bg">
                <Fish className="size-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-2xl font-semibold">Machh Bazar</span>
            </Link>
            <p className="mt-5 max-w-72 text-sm leading-6 text-market-ink/58">
              Fresh fish with proof of source, catch time, and exact weight.
            </p>

            <div className="mt-7 flex max-w-md flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-market-ink/58">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="size-4 text-market-aqua" aria-hidden="true" /> Verified sellers
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPinned className="size-4 text-market-accent" aria-hidden="true" /> Source trace
              </span>
              <span className="inline-flex items-center gap-2">
                <Scale className="size-4 text-market-aqua" aria-hidden="true" /> Exact weight
              </span>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[10px] font-bold uppercase text-market-ink/42">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-market-ink/65 transition-colors hover:text-market-ink"
                    >
                      {link.name}
                      <ArrowUpRight
                        className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-market-ink/15 py-5 text-[10px] font-semibold uppercase text-market-ink/38 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Machh Bazar. All rights reserved.</span>
          <span>23.5941° N · 90.2623° E · Dhaka</span>
        </div>
      </div>
    </footer>
  );
}
