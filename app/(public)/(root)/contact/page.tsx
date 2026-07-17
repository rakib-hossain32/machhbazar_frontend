import { ContactForm } from "@/components/marketplace/contact-form";
import {
  MarketPageHeader,
  MarketSection,
  SectionTitle,
} from "@/components/marketplace/page-shell";
import { Clock3, Mail, MapPin, Phone, Store } from "lucide-react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Machh Bazar about orders, quality, trace corrections, seller applications, or account support.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <>
      <MarketPageHeader
        eyebrow="Support"
        title="Talk to the right team"
        description="Share an order number or lot code when possible so we can investigate the exact record."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <MarketSection className="grid gap-10 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:py-16">
        <div>
          <SectionTitle eyebrow="Contact routes" title="Start with context" />
          <div className="mt-7 divide-y divide-border border-y border-border">
            {[
              { icon: Mail, label: "Email", value: "support@machhbazar.com" },
              { icon: Phone, label: "Phone", value: "+880 9600 123 456" },
              {
                icon: Clock3,
                label: "Support hours",
                value: "8:00 AM–10:00 PM",
              },
              { icon: MapPin, label: "Operations", value: "Dhaka, Bangladesh" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-4">
                <Icon className="size-4 text-primary" />
                <div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-bold text-ink">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex items-start gap-3 rounded-lg border border-coral/20 bg-coral/8 p-4">
            <Store className="size-4 shrink-0 text-coral" />
            <p className="text-xs leading-5 text-muted-foreground">
              <strong className="text-ink">Seller applications:</strong> use
              this form or begin the dedicated onboarding flow.
            </p>
          </div>
        </div>
        <ContactForm />
      </MarketSection>
    </>
  );
}
