"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function getAccessToken(): Promise<string> {
  const cookieJar = await cookies();
  const refresh_token = cookieJar.get("spotify_refresh_token")?.value;

  // 1. Check if we have a Refresh Token at all
  if (!refresh_token) {
    redirect(
      "/error?message=No Spotify refresh token found. Please login again."
    );
  }

  // 2. Perform the Token Exchange (Refresh)
  const tokenResponse = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: SPOTIFY_CLIENT_ID,
    }),
  });

  const data = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error("Spotify refresh failed, forcing re-login:", data);
    redirect(
      "/error?message=No Spotify refresh token found. Please login again."
    );
  }

  const access_token = data.access_token;
  const newRefreshToken = data.refresh_token;

  // 3. Store the NEW Access Token in cookies using the cookies() utility
  try {
    cookieJar.set("spotify_access_token", access_token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 - 60, // 59 minutes
      path: "/",
    });

    // 4. Update Refresh Token if Spotify provided a new one
    if (newRefreshToken && newRefreshToken !== refresh_token) {
      cookieJar.set("spotify_refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }
  } catch (error) {
    console.warn(
      "Could not set cookies (likely in Server Component render):",
      error
    );
    // We continue because we have the token to return
  }

  return access_token;
}
