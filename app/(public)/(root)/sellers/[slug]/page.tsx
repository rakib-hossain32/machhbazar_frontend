import { getSeller } from "@/components/marketplace/market-data";
import { SellerStorefront } from "@/components/marketplace/seller-storefront";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seller = getSeller(slug);
  return {
    title: seller.name,
    description: `Shop active verified lots from ${seller.name} and review public fulfillment performance.`,
    alternates: { canonical: `/sellers/${slug}` },
  };
}
export default async function SellerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SellerStorefront slug={slug} />;
}
