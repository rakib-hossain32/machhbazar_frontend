"use client";

import { SystemStatePage } from "@/components/system-state-page";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SystemStatePage
          variant="error"
          reference={error.digest}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
