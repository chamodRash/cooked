import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto"; // Node's native crypto module

// Define the name of the cookie we will use
const CODE_VERIFIER_COOKIE_KEY = "spotify_code_verifier";

export async function GET() {
  // --- 1. Environment Check ---
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

  if (!clientId) {
    return NextResponse.json(
      { error: "Server configuration error: Client ID missing" },
      { status: 500 }
    );
  }

  try {
    // --- 2. PKCE Parameter Generation (using Node.js crypto) ---

    // Generate the Code Verifier (random string, 43-128 chars)
    const codeVerifier = crypto.randomBytes(64).toString("base64url");

    // Generate the Code Challenge (SHA256 hash of the Verifier)
    const codeChallenge = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64url"); // Base64-URL encoding built-in to Node 16+

    // --- 3. Securely Save the Code Verifier in an HTTP-only Cookie ---
    const cookieStore = await cookies();
    cookieStore.set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
      httpOnly: true, // Prevents client-side JS access (XSS defense)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      maxAge: 60 * 5, // Expires in 5 minutes (more than enough time to complete login)
      path: "/",
    });

    // --- 4. Build Authorization URL and Redirect ---

    const scope =
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative";
    const authUrl = new URL("https://accounts.spotify.com/authorize"); // Spotify Auth Endpoint

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
      // (Optional but Recommended) Add a 'state' parameter here for CSRF defense
    });

    authUrl.search = params.toString();

    // Redirect the user's browser
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error(
      "Unexpected error during Spotify authorization setup:",
      error
    );
    return NextResponse.json(
      { error: "Internal server error during authorization setup" },
      { status: 500 }
    );
  }
}
