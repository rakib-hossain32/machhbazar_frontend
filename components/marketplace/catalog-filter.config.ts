import { catalogFilters } from "@/components/marketplace/market-data";
import type {
  CatalogFilterKey,
  CatalogFilterMeta,
} from "@/components/marketplace/catalog-filter.types";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck2,
  Fish,
  MapPin,
  Scale,
  Scissors,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";

export const catalogFilterMeta: Record<
  CatalogFilterKey,
  CatalogFilterMeta
> = {
  zone: { icon: MapPin, step: "01", hint: "Delivery map" },
  category: { icon: Fish, step: "02", hint: "Fish family" },
  source: { icon: Waves, step: "03", hint: "Water & farm" },
  price: { icon: Banknote, step: "04", hint: "Your budget" },
  weight: { icon: Scale, step: "05", hint: "Basket size" },
  freshness: { icon: Sparkles, step: "06", hint: "Catch evidence" },
  verification: { icon: BadgeCheck, step: "07", hint: "Trust signal" },
  cut: { icon: Scissors, step: "08", hint: "Kitchen ready" },
  rating: { icon: Star, step: "09", hint: "Seller record" },
  available: { icon: CalendarCheck2, step: "10", hint: "Ready today" },
};

export const quickCatalogFilters = [
  {
    id: "budget",
    label: "Budget net",
    caption: catalogFilters[3].values[0],
    key: "price",
    value: catalogFilters[3].values[0],
    icon: Banknote,
  },
  {
    id: "proof",
    label: "Proof first",
    caption: "Inspector checked",
    key: "freshness",
    value: catalogFilters[5].values[0],
    icon: BadgeCheck,
  },
  {
    id: "today",
    label: "Today’s haul",
    caption: catalogFilters[5].values[2],
    key: "freshness",
    value: catalogFilters[5].values[2],
    icon: Sparkles,
  },
] as const;

export const deliveryZones = catalogFilters[0].values;

export const deliveryZoneDetails: Record<
  (typeof deliveryZones)[number],
  { code: string; note: string }
> = {
  "Dhaka North": { code: "N-01", note: "Uttara · Mirpur · Airport" },
  "Dhaka Central": { code: "C-02", note: "Dhanmondi · Tejgaon · Gulshan" },
  "Dhaka South": { code: "S-03", note: "Old Dhaka · Jatrabari · Keraniganj" },
};

