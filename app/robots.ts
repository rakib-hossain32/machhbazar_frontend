import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/shop",
        "/fish/",
        "/sellers/",
        "/trace/",
        "/recipes",
        "/about",
        "/faq",
        "/contact",
        "/policies/",
      ],
      disallow: [
        "/cart",
        "/checkout",
        "/order/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/dashboard",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
