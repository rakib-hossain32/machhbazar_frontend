"use server";

import { envVars } from "@/lib/env";
import { setTokenInCookies } from "@/lib/utils/token";
import { cookies } from "next/headers";

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken =
      cookieStore.get("better-auth.session_token")?.value ??
      cookieStore.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
      return false;
    }

    const res = await fetch(`${envVars.API_URL}/v1/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    const { data } = await res.json();

    const { accessToken, refreshToken: newRefreshToken } = data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function setTokens(tokens: {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
}) {
  if (!tokens) return false;

  if (tokens.accessToken) {
    await setTokenInCookies("accessToken", tokens.accessToken);
  }

  if (tokens.refreshToken) {
    await setTokenInCookies("refreshToken", tokens.refreshToken);
  }

  if (tokens.token) {
    await setTokenInCookies(
      "better-auth.session_token",
      tokens.token,
      7 * 24 * 60 * 60,
    );
  }

  return true;
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken =
      cookieStore.get("better-auth.session_token")?.value ??
      cookieStore.get("__Secure-better-auth.session_token")?.value;

    if (!accessToken || !sessionToken) {
      return null;
    }

    const res = await fetch(`${envVars.API_URL}/v1/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
