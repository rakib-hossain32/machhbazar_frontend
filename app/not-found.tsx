import { SystemStatePage } from "@/components/system-state-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Machh Bazar page could not be found.",
};

export default function NotFound() {
  return <SystemStatePage variant="not-found" />;
}
