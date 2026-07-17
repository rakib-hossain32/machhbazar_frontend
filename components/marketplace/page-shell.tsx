import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Breadcrumb = { label: string; href?: string };

export function MarketPageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  action?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-surface">
      <div className="landing-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12 lg:px-10 xl:px-0">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            {breadcrumbs.map((item) => (
              <span key={`${item.label}-${item.href ?? "current"}`} className="flex items-center gap-1.5">
                <ChevronRight className="size-3" aria-hidden="true" />
                {item.href ? <Link href={item.href} className="hover:text-primary">{item.label}</Link> : <span className="text-ink">{item.label}</span>}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase"><span className="h-px w-7 bg-coral" />{eyebrow}</p>
            <h1 className="mt-3 max-w-4xl font-heading text-4xl leading-[0.96] font-semibold text-ink sm:text-5xl">{title}</h1>
            {description ? <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>
    </header>
  );
}

export function MarketSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0 ${className}`}>{children}</section>;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      {eyebrow ? <p className="text-[10px] font-bold text-primary uppercase">{eyebrow}</p> : null}
      <h2 className="mt-2 font-heading text-3xl leading-none font-semibold text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function StatusBadge({
  icon: Icon,
  children,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: ReactNode;
  tone?: "primary" | "action" | "coral" | "warning";
}) {
  const toneClasses = {
    primary: "bg-primary-soft text-primary",
    action: "bg-action/10 text-action",
    coral: "bg-coral/10 text-coral",
    warning: "bg-warning/10 text-warning",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-bold ${toneClasses[tone]}`}>
      <Icon className="size-3.5" aria-hidden /> {children}
    </span>
  );
}
