import { QueryProviders } from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Machh Bazar — Fresh Fish, Fully Traceable",
    template: "%s | Machh Bazar",
  },
  description: "Shop fresh fish with proof of source, catch time, and exact weight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${cormorantGaramond.variable} ${geistMono.variable}`}
    >
      <head />
      <body className="font-sans antialiased" suppressHydrationWarning>
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
        
<TooltipProvider>
<QueryProviders>{children}</QueryProviders>
</TooltipProvider>
        <Toaster theme="system" position="top-right" richColors />
      
</ThemeProvider>
</body>
    </html>
  );
}
