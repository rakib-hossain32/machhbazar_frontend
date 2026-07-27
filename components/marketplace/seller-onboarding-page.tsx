import { fishImages } from "@/components/landing/landing-data";
import { MarketSection, SectionTitle } from "@/components/marketplace/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  FileLock2,
  Fish,
  MapPinned,
  Scale,
  ShieldCheck,
  Store,
  UserRound,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const applicationSteps = [
  {
    number: "01",
    icon: UserRound,
    title: "Create your customer account",
    description: "Seller access begins with a verified personal account and email.",
  },
  {
    number: "02",
    icon: Store,
    title: "Build the shop profile",
    description: "Add your shop name, business type, operating address, and service area.",
  },
  {
    number: "03",
    icon: FileLock2,
    title: "Submit private documents",
    description: "Provide identity, trade, and payout evidence through the protected application flow.",
  },
  {
    number: "04",
    icon: ClipboardCheck,
    title: "Complete manual review",
    description: "Operations checks the application and approves it or requests specific changes.",
  },
] as const;

const applicationKit = [
  "National ID for the applicant or authorized representative",
  "Trade license or relevant local business document",
  "Shop and fulfillment address with service-area details",
  "Bank, bKash, or Nagad payout ownership evidence",
  "A clear description of sourcing and handling practices",
] as const;

const reviewStandards = [
  {
    icon: MapPinned,
    title: "Source readiness",
    description: "You can record origin, catch or harvest time, and the responsible supplier for each lot.",
  },
  {
    icon: Scale,
    title: "Weight discipline",
    description: "Requested, packed, available, and sold weight can be maintained as separate records.",
  },
  {
    icon: BadgeCheck,
    title: "Fulfillment reliability",
    description: "Your team can prepare, pack, and hand over orders within the promised service window.",
  },
] as const;

export function SellerOnboardingPage({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const primaryHref = isAuthenticated
    ? "/dashboard/seller/onboarding"
    : "/register";
  const primaryLabel = isAuthenticated
    ? "Open application workspace"
    : "Create account to apply";
  const secondaryHref = isAuthenticated
    ? "/dashboard"
    : "/login?redirect=/dashboard/seller/onboarding";
  const secondaryLabel = isAuthenticated
    ? "Go to dashboard"
    : "Sign in to continue";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-market-rail text-market-rail-ink">
        <Image
          src={fishImages.boats}
          alt="Fishing boats preparing to bring a fresh catch to market"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-market-rail/84" aria-hidden="true" />
        <div className="landing-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-between px-5 py-10 sm:min-h-[680px] sm:px-8 sm:py-14 lg:min-h-[720px] lg:px-10 xl:px-0">
          <div className="flex items-center justify-between gap-4 border-b border-market-rail-ink/16 pb-5">
            <Badge variant="secondary">
              <ShieldCheck data-icon="inline-start" aria-hidden="true" />
              Seller applications
            </Badge>
            <span className="font-mono text-[9px] uppercase text-market-rail-ink/50 sm:text-[10px]">
              Bangladesh / verified commerce
            </span>
          </div>

          <div className="max-w-4xl py-14 sm:py-20">
            <p className="hero-reveal flex items-center gap-3 text-[10px] font-bold uppercase text-market-aqua sm:text-xs">
              <span className="h-px w-8 bg-market-accent" aria-hidden="true" />
              Seller onboarding
            </p>
            <h1 className="hero-reveal hero-delay-1 mt-5 max-w-4xl font-heading text-5xl leading-[0.9] font-semibold text-balance sm:text-7xl lg:text-8xl">
              Bring your catch to a market built on <em className="font-medium text-market-accent">proof.</em>
            </h1>
            <p className="hero-reveal hero-delay-2 mt-7 max-w-2xl text-sm leading-7 text-market-rail-ink/68 sm:text-lg sm:leading-8">
              Build a verified shop, publish traceable lots, manage exact-weight orders, and earn through a marketplace designed for accountable fish commerce.
            </p>

            <div className="hero-reveal hero-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                render={<Link href={primaryHref} />}
                nativeButton={false}
                size="lg"
              >
                <Store data-icon="inline-start" aria-hidden="true" />
                {primaryLabel}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button
                render={<Link href={secondaryHref} />}
                nativeButton={false}
                size="lg"
                variant="outline"
              >
                <UserRound data-icon="inline-start" aria-hidden="true" />
                {secondaryLabel}
              </Button>
            </div>
          </div>

          <div className="grid gap-px border-y border-market-rail-ink/16 bg-market-rail-ink/16 sm:grid-cols-3">
            {[
              ["Review", "Manual and evidence-led"],
              ["Documents", "Private by default"],
              ["Payout", "Bank, bKash, or Nagad"],
            ].map(([label, value]) => (
              <div key={label} className="bg-market-rail/88 px-4 py-4 sm:px-5">
                <p className="font-mono text-[9px] font-bold uppercase text-market-rail-ink/40">{label}</p>
                <p className="mt-1 text-xs font-bold sm:text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketSection className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <SectionTitle
            eyebrow="Application route"
            title="From account to first live lot"
            description="The application is a controlled path. Approval unlocks the seller workspace; it does not bypass product and lot verification."
          />

          <ol className="border-t border-border">
            {applicationSteps.map(({ number, icon: Icon, title, description }) => (
              <li key={number} className="grid grid-cols-[38px_1fr_auto] items-start gap-4 border-b border-border py-5 sm:grid-cols-[48px_1fr_auto] sm:py-6">
                <span className="font-mono text-[10px] font-bold text-coral">{number}</span>
                <div>
                  <h2 className="font-heading text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
                  <p className="mt-2 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm">{description}</p>
                </div>
                <Icon className="size-5 text-primary sm:size-6" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </MarketSection>

      <div className="border-y border-border bg-surface">
        <MarketSection className="grid gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-20">
          <div>
            <SectionTitle
              eyebrow="Application kit"
              title="Prepare the evidence once"
              description="Clear, current documents make review faster and reduce requests for changes."
            />
            <ul className="mt-8 border-t border-border">
              {applicationKit.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border py-4 text-sm leading-6 text-ink">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center bg-primary-soft text-primary">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative overflow-hidden bg-market-rail p-7 text-market-rail-ink sm:p-9">
            <div className="landing-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative">
              <FileLock2 className="size-8 text-market-aqua" aria-hidden="true" />
              <p className="mt-8 text-[10px] font-bold uppercase text-market-aqua">Private by design</p>
              <h2 className="mt-3 font-heading text-4xl leading-none font-semibold">KYC stays off the storefront.</h2>
              <p className="mt-5 text-sm leading-7 text-market-rail-ink/65">
                Customers see verification status and seller performance. They never see your NID, trade license, payout document, or private review notes.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-market-rail-ink/16 pt-5 text-xs font-semibold text-market-rail-ink/60">
                <ShieldCheck className="size-4 text-market-accent" aria-hidden="true" />
                Protected applicant records
              </div>
            </div>
          </aside>
        </MarketSection>
      </div>

      <MarketSection className="py-16 sm:py-20 lg:py-24">
        <SectionTitle
          eyebrow="Approval standards"
          title="What a market-ready seller can prove"
          description="The review focuses on operational readiness, not polished marketing language."
        />
        <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {reviewStandards.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-background p-6 sm:p-7">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h2 className="mt-8 font-heading text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </MarketSection>

      <section className="border-t border-border bg-market-bg">
        <MarketSection className="grid gap-8 py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-primary">
              <Building2 className="size-4" aria-hidden="true" />
              Ready when your records are
            </div>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl leading-none font-semibold text-ink sm:text-5xl">
              Start the seller application.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Save your progress, submit when the checklist is complete, and track any requested changes from your account.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button render={<Link href={primaryHref} />} nativeButton={false} size="lg">
              <FileCheck2 data-icon="inline-start" aria-hidden="true" />
              {primaryLabel}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <Button render={<Link href="/contact" />} nativeButton={false} size="lg" variant="outline">
              <WalletCards data-icon="inline-start" aria-hidden="true" />
              Ask the onboarding team
            </Button>
          </div>
        </MarketSection>
      </section>
    </>
  );
}
