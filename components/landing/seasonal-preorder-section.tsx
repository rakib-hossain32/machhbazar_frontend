import { fishImages } from "@/components/landing/landing-data";
import { ArrowRight, BellRing, CalendarDays, Check, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SeasonalPreorderSection() {
  return (
    <section className="bg-surface-muted py-16 sm:py-20" aria-labelledby="seasonal-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div className="grid overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[340px] overflow-hidden sm:min-h-[430px] lg:min-h-[520px]">
            <Image
              src={fishImages.boats}
              alt="Fishing boats preparing for a seasonal catch"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 text-white sm:inset-x-8 sm:bottom-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-white/65 uppercase">Next seasonal window</p>
                <p className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">Coastal pomfret · August</p>
              </div>
              <Waves className="hidden size-8 text-coral sm:block" aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-warning px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">V2 preview</span>
              <span className="text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase">Seasonal pre-order</span>
            </div>
            <h2 id="seasonal-title" className="mt-5 font-heading text-4xl leading-[0.96] font-semibold text-ink sm:text-5xl">
              Reserve the season,<br /><span className="italic text-primary">before the boat lands.</span>
            </h2>
            <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">
              Join a seasonal release list, choose your preferred size and cut, then confirm only when a verified lot becomes available.
            </p>

            <div className="mt-7 space-y-3 text-sm font-semibold text-ink/72">
              <p className="flex items-center gap-3"><Check className="size-4 text-primary" /> No charge until a lot is confirmed</p>
              <p className="flex items-center gap-3"><CalendarDays className="size-4 text-action" /> Expected landing window shown upfront</p>
              <p className="flex items-center gap-3"><BellRing className="size-4 text-coral" /> Priority alert when evidence is published</p>
            </div>

            <Link href="/shop?availability=preorder" className="group mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/88">
              Explore upcoming catch <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
