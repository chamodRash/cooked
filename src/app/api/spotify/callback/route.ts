import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

// Environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CODE_VERIFIER_COOKIE_KEY = "spotify_code_verifier";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    // Handle error
    return NextResponse.redirect(
      new URL(`/error?message=${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/error?message=Authorization code missing", request.url)
    );
  }

  // 1. Retrieve the Code Verifier from the secure HTTP-only cookie
  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get(CODE_VERIFIER_COOKIE_KEY)?.value;

  if (!codeVerifier) {
    return NextResponse.redirect(
      new URL("/error?message=Code verifier missing", request.url)
    );
  }

  // 2. Perform the Token Exchange
  try {
    const tokenResponse = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        code_verifier: codeVerifier, // PKCE requires the code_verifier here
      }),
    });

    const data = await tokenResponse.json();

    console.log("Token response data:", JSON.stringify(data, null, 2)); // Debug log

    if (!tokenResponse.ok) {
      // Log the error response from Spotify
      console.error("Spotify token exchange failed:", data);
      return NextResponse.redirect(
        new URL(
          `/error?message=Token exchange failed: ${data.error_description}`,
          request.url
        )
      );
    }

    // Extract tokens
    const { access_token, refresh_token, expires_in } = data;

    // 3. Store Tokens and Clear Code Verifier
    // Store access_token and refresh_token securely
    // The tokens allow you to make API calls to get playlist history.

    const response = NextResponse.redirect(new URL("/spotify", request.url));

    // Set a cookie for the access token
    cookieStore.set("spotify_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in, // typically 3600 seconds (1 hour)
      path: "/",
    });

    // Set a cookie for the refresh token (long-lived)
    cookieStore.set("spotify_refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    // IMPORTANT: Clear the one-time-use code verifier
    response.cookies.delete(CODE_VERIFIER_COOKIE_KEY);

    // 4. Redirect the user to your main application page after successful authentication
    return response;
  } catch (e) {
    console.error("Error during token exchange:", e);
    return NextResponse.redirect(
      new URL(
        "/error?message=Internal server error during token exchange",
        request.url
      )
    );
  }
}

// In the App Router, only the exported HTTP method handler (like GET) is used.
