"use server";

import { getAccessToken } from "@/lib/spotify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserData() {
  // Get the refresh token from cookies
  const cookie = await cookies();
  let access_token = cookie.get("spotify_access_token")?.value;
  const refresh_token = cookie.get("spotify_refresh_token")?.value;

  if (!refresh_token) {
    //Redirect to error page if no refresh token found
    redirect(
      "/error?message=No Spotify refresh token found. Please login again."
    );
  }

  if (!access_token) {
    access_token = await getAccessToken();
  }

  // Authorization Header for Spotify API requests
  const authHeader = `Bearer ${access_token}`;

  // Fetch the user's profile data from Spotify
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: authHeader,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch Spotify user data:", await response.text());
    throw new Error("Failed to fetch Spotify user data");
  }

  const data = await response.json();

  return data;
}

export async function getUserPlaylists() {
  const access_token = await getAccessToken();

  // Authorization Header for Spotify API requests
  const authHeader = `Bearer ${access_token}`;

  // Fetch the user's playlists from Spotify
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: authHeader,
    },
  });

  if (!response.ok) {
    console.error(
      "Failed to fetch Spotify user playlists:",
      await response.text()
    );
    throw new Error("Failed to fetch Spotify user playlists");
  }

  const data = await response.json();

  return data;
}

export async function getUserRecentlyPlayed() {
  const access_token = await getAccessToken();

  // Authorization Header for Spotify API requests
  const authHeader = `Bearer ${access_token}`;

  // Fetch the user's recently played tracks from Spotify
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=20",
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch Spotify recently played:",
      await response.text()
    );
    throw new Error("Failed to fetch Spotify recently played");
  }

  const data = await response.json();

  return data;
}
