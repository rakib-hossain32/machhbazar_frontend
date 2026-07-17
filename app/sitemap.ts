import type { MetadataRoute } from "next";
import {
  allProducts,
  recipes,
  sellers,
} from "@/components/marketplace/market-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = [
    "",
    "/shop",
    "/recipes",
    "/about",
    "/faq",
    "/contact",
    "/policies/privacy",
    "/policies/terms",
    "/policies/refund",
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency:
        path === "/shop" ? ("daily" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...allProducts.map((product) => ({
      url: `${baseUrl}/fish/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...sellers.map((seller) => ({
      url: `${baseUrl}/sellers/${seller.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...recipes.map((recipe) => ({
      url: `${baseUrl}/recipes/${recipe.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
