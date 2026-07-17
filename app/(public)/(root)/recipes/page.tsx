import { RecipesIndex } from "@/components/marketplace/recipes-index";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fish Recipes",
  description:
    "Practical fish recipes matched to fresh catch available from verified sellers.",
  alternates: { canonical: "/recipes" },
};
export default function RecipesPage() {
  return <RecipesIndex />;
}
