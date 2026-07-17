import { policies, PolicyPage } from "@/components/marketplace/policy-page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return Object.keys(policies).map((policy) => ({ policy }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  const { policy } = await params;
  const content = policies[policy];
  if (!content) return {};
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: `/policies/${policy}` },
  };
}
export default async function PolicyRoute({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const { policy } = await params;
  if (!policies[policy]) notFound();
  return <PolicyPage policyKey={policy} />;
}
