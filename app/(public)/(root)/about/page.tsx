import { AboutPage } from "@/components/marketplace/about-page";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "About", description: "Learn how Machh Bazar connects fresh fish, verified sources, exact weight, and public catch evidence.", alternates: { canonical: "/about" } };
export default function AboutRoute() { return <AboutPage />; }
