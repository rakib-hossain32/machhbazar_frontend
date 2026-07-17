import { SectionHeading } from "@/components/landing/section-heading";
import { BadgeCheck, Quote, Star } from "lucide-react";

const reviews = [
  {
    quote: "The packed weight matched the invoice exactly, and I could see when the Hilsa left Mawa. That level of detail made the purchase feel completely different.",
    name: "Nadia Rahman",
    area: "Dhanmondi",
    order: "Padma Hilsa · verified purchase",
  },
  {
    quote: "I selected cleaned Rohu and the cut yield was shown before checkout. It arrived on time, properly packed, and ready for the pot.",
    name: "Fahim Chowdhury",
    area: "Uttara",
    order: "Jamuna Rohu · verified purchase",
  },
  {
    quote: "The seller profile and freshness proof helped me choose between similar listings instead of guessing from price alone.",
    name: "Samira Ahmed",
    area: "Bashundhara",
    order: "Tiger Prawn · verified purchase",
  },
] as const;

export function CustomerReviewsSection() {
  return (
    <section className="bg-market-rail py-16 text-market-rail-ink sm:py-20" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div id="reviews-title">
          <SectionHeading
            eyebrow="Customer notes"
            title="Freshness people could verify"
            description="Recent feedback from completed, traceable orders across Dhaka."
            light
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <figure key={review.name} className={`rounded-lg border p-5 sm:p-7 ${index === 0 ? "border-coral/50 bg-coral/8" : "border-market-rail-ink/12 bg-market-rail-ink/4"}`}>
              <div className="flex items-center justify-between">
                <Quote className={`size-7 ${index === 0 ? "text-coral" : "text-market-rail-ink/26"}`} aria-hidden="true" />
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="size-3.5 fill-warning text-warning" />)}
                </div>
              </div>
              <blockquote className="mt-7 font-heading text-2xl leading-[1.18] font-medium text-market-rail-ink/92">“{review.quote}”</blockquote>
              <figcaption className="mt-8 border-t border-market-rail-ink/12 pt-5">
                <p className="text-sm font-bold text-market-rail-ink">{review.name} <span className="font-normal text-market-rail-ink/45">· {review.area}</span></p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.07em] text-primary uppercase"><BadgeCheck className="size-3.5" /> {review.order}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
