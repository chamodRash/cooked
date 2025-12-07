"use server";

import { ai } from "@/lib/gemini";
import { getUserData, getUserRecentlyPlayed } from "./spotify";
import { RecentlyPlayedResponse, UserProfile } from "@/types/spotify";

/**
 * Fetches user data, generates a roast prompt, and calls Gemini.
 */
export async function generateRoast() {
  try {
    // 1. Gather User Data (Server-side)
    const user: UserProfile = await getUserData();
    const tracks: RecentlyPlayedResponse = await getUserRecentlyPlayed();

    // Concatenate details into a single string
    const userData = `
      User Profile: ${user.display_name} (${user.country}), 
      Followers: ${user.followers.total}.
      Recently Played Tracks (Titles and Artists): 
      ${tracks.items
        .map(
          (item) =>
            `- ${item.track.name} by ${item.track.artists
              .map((a) => a.name)
              .join(", ")}`
        )
        .join("\n")}
    `;

    // 2. Construct the Prompt
    const prompt = `
      You are a stand-up comedian specialized in roasting music listeners. 
      You have been given the following user data and their recently played Spotify tracks. 
      Your goal is to write a short, funny, and insulting roast based on this information. 
      Keep it brief and concise.
      
      User Data:
      ---
      ${userData}
      ---
    `;

    // 3. Call the Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Add gemini 3 pro
      contents: prompt,
    });

    // 4. Return the Text
    return {
      roast: response.text,
      success: true,
    };
  } catch (error) {
    console.error("Gemini Roast Generation Failed:", error);
    return {
      roast: "Oops! I crashed. Maybe your music taste broke my servers.",
      success: false,
    };
  }
}
