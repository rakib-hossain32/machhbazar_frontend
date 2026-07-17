import { ArrowRight } from "lucide-react";
import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p
          className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase ${
            light ? "text-white/62" : "text-primary"
          }`}
        >
          <span className={`h-px w-7 ${light ? "bg-coral" : "bg-coral"}`} />
          {eyebrow}
        </p>
        <h2
          className={`mt-3 max-w-3xl font-heading text-4xl leading-[0.96] font-semibold sm:text-5xl ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-4 max-w-2xl text-sm leading-6 sm:text-base ${light ? "text-white/65" : "text-muted-foreground"}`}>
            {description}
          </p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className={`group inline-flex w-fit items-center gap-2 text-sm font-bold ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
