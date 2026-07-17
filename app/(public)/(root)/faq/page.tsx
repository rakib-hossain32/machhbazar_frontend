import { FaqPage } from "@/components/marketplace/faq-page";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about fish weight, freshness evidence, traceability, delivery, refunds, and account safety.",
  alternates: { canonical: "/faq" },
};
export default function FaqRoute() {
  return <FaqPage />;
}
