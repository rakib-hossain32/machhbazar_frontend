import { TracePage } from "@/components/marketplace/trace-page";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lotCode: string }>;
}): Promise<Metadata> {
  const { lotCode } = await params;
  return {
    title: `Trace ${lotCode}`,
    description: `Public catch passport and evidence timeline for lot ${lotCode}.`,
    alternates: { canonical: `/trace/${lotCode}` },
  };
}
export default async function PublicTracePage({
  params,
}: {
  params: Promise<{ lotCode: string }>;
}) {
  const { lotCode } = await params;
  return <TracePage lotCode={lotCode} />;
}
