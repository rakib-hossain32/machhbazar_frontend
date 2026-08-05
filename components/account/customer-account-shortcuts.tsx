import { Button } from "@/components/ui/button";
import { Fish, PackageSearch, Settings } from "lucide-react";
import Link from "next/link";

const shortcuts = [
  {
    href: "/order/tracking",
    icon: PackageSearch,
    mobileLabel: "Track",
    label: "Track an order",
    variant: "default" as const,
  },
  {
    href: "/shop",
    icon: Fish,
    mobileLabel: "Shop",
    label: "Browse fresh catch",
    variant: "outline" as const,
  },
  {
    href: "#profile-settings",
    icon: Settings,
    mobileLabel: "Settings",
    label: "Profile settings",
    variant: "outline" as const,
  },
];

export function CustomerAccountShortcuts() {
  return (
    <nav
      aria-label="Customer account shortcuts"
      className="mb-8 grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2"
    >
      {shortcuts.map(({ href, icon: Icon, label, mobileLabel, variant }) => (
        <Button
          key={href}
          render={<Link href={href} />}
          nativeButton={false}
          size="sm"
          variant={variant}
          className="min-w-0 sm:flex-none"
          aria-label={label}
        >
          <Icon data-icon="inline-start" />
          <span className="sm:hidden">{mobileLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </nav>
  );
}
