import { getProduct } from "@/components/marketplace/market-data";
import { ProductDetail } from "@/components/marketplace/product-detail";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product.name,
    description: `Buy ${product.name} from ${product.seller} with source, weight, and freshness evidence.`,
    alternates: { canonical: `/fish/${slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: `${product.name} from ${product.origin}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetail slug={slug} />
    </>
  );
}
