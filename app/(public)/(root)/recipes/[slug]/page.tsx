import { getRecipe } from "@/components/marketplace/market-data";
import { RecipeDetail } from "@/components/marketplace/recipe-detail";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  return {
    title: recipe.title,
    description: recipe.description,
    alternates: { canonical: `/recipes/${slug}` },
  };
}
export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RecipeDetail slug={slug} />;
}
