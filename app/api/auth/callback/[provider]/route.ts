import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_PROVIDERS = ["google"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;

  if (!SUPPORTED_PROVIDERS.includes(provider)) {
    return NextResponse.redirect(
      new URL("/login?error=unsupported_provider", request.url),
    );
  }

  const { searchParams } = request.nextUrl;

  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const appUrl = new URL(request.url);
  const requestedRedirectUrl = new URL(redirectPath, appUrl);
  const finalRedirectUrl =
    requestedRedirectUrl.origin === appUrl.origin
      ? requestedRedirectUrl
      : new URL("/dashboard", appUrl);

  // OAuth tokens are set as HttpOnly cookies by the backend. Never accept
  // credentials from query parameters, where logs and browser history expose them.
  return NextResponse.redirect(finalRedirectUrl);
}
