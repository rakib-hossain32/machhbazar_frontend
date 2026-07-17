import type { LucideIcon } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export const authFieldClassName =
  "gap-2 [&_[data-slot=field-label]]:text-xs [&_[data-slot=field-label]]:font-bold [&_[data-slot=input-group]]:h-12 [&_[data-slot=input-group]]:rounded-lg [&_[data-slot=input-group]]:bg-surface [&_[data-slot=input-group]]:shadow-[0_6px_20px_rgba(19,42,45,0.035)] [&_[data-slot=input-group-control]]:px-3";

type AuthFormHeaderProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function AuthFormHeader({ icon: Icon, eyebrow, title, description }: AuthFormHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase">{eyebrow}</span>
      </div>
      <h2 className="mt-6 font-heading text-4xl leading-[0.96] font-semibold text-ink sm:text-5xl">{title}</h2>
      <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
    </header>
  );
}

export function AuthDivider({ children = "or continue with" }: { children?: ReactNode }) {
  return (
    <div className="my-6 flex items-center gap-3" role="separator">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-bold text-muted-foreground uppercase">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function AuthSecurityNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
