import { popularFish, recipes, sellers, verifiedCatch, type FishProduct } from "@/components/landing/landing-data";

export const allProducts: FishProduct[] = Array.from(
  new Map([...verifiedCatch, ...popularFish].map((product) => [product.slug, product])).values(),
);

export function getProduct(slug: string) {
  return allProducts.find((product) => product.slug === slug) ?? verifiedCatch[0];
}

export function getSeller(slug: string) {
  return sellers.find((seller) => seller.slug === slug) ?? sellers[0];
}

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug) ?? recipes[0];
}

export const catalogFilters = [
  { key: "zone", title: "Delivery zone", values: ["Dhaka North", "Dhaka Central", "Dhaka South"] },
  { key: "category", title: "Category", values: ["River fish", "Sea fish", "Prawn & crab", "Farm fresh"] },
  { key: "source", title: "Source", values: ["Wild", "Farmed", "River", "Sea"] },
  { key: "price", title: "Price per kg", values: ["Under ৳600", "৳600–৳1,000", "Above ৳1,000"] },
  { key: "weight", title: "Available weight", values: ["Under 10 kg", "10–20 kg", "20 kg+"] },
  { key: "freshness", title: "Freshness proof", values: ["Inspector verified", "Full passport", "Caught today"] },
  { key: "verification", title: "Verification level", values: ["Source verified", "Weight verified", "Inspector verified"] },
  { key: "cut", title: "Preparation", values: ["Whole", "Cleaned", "Steaks", "Fillet"] },
  { key: "rating", title: "Seller rating", values: ["4.5 and above", "4.0 and above"] },
  { key: "available", title: "Availability", values: ["Available today"] },
] as const;

export { recipes, sellers };
