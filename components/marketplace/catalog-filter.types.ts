import { catalogFilters } from "@/components/marketplace/market-data";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type CatalogFilterKey = (typeof catalogFilters)[number]["key"];

export type CatalogFilterPanelProps = {
  activeCount: number;
  className?: string;
  footerAction?: ReactNode;
  headerAction?: ReactNode;
  idPrefix: string;
  mode?: "desktop" | "sheet";
  onFilterChange: (key: CatalogFilterKey, value?: string) => void;
  onReset: () => void;
  selectedValues: Partial<Record<CatalogFilterKey, string>>;
};

export type CatalogFilterMeta = {
  hint: string;
  icon: LucideIcon;
  step: string;
};

