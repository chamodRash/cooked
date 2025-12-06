import { getUserData, getUserPlaylists } from "@/actions/spotify";
import { Card } from "@/components/ui/card";
import { UserPlaylistsResponse, UserProfile } from "@/types/spotify";
import { Music } from "lucide-react";
import Link from "next/link";

export default async function SpotifyPage() {
  //Fetch user data from Spotify API
  const userData: UserProfile = await getUserData();
  const userPlaylist: UserPlaylistsResponse = await getUserPlaylists();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-linear-to-b from-green-900 to-black p-8">
      <main className="mt-16 flex flex-col items-center justify-start gap-8 text-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            <Music className="size-8 mr-3 inline-block" /> Spotify Connection
          </h1>
          <p className="max-w-md text-lg text-green-100">
            Connect your Spotify account to get roasted based on your music
            taste.
          </p>
        </div>

        {/* A Card Containing most important user data and below that another card containing his playlist */}
        <Card className="w-full max-w-2xl bg-green-900/30 p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Welcome, {userData.display_name}!
          </h2>
          <p className="text-green-100">
            You have {userData.followers.total} followers and are using a{" "}
            {userData.product} account.
          </p>
        </Card>

        <Card className="w-full max-w-2xl bg-green-900/30 p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Your Playlists
          </h2>
          {userPlaylist.items.length === 0 ? (
            <p className="text-green-100">You have no playlists.</p>
          ) : (
            userPlaylist.items.map((playlist) => (
              <div key={playlist.id} className="text-green-100">
                {playlist.name}
              </div>
            ))
          )}
        </Card>

        <div className="absolute top-8 left-8">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-white transition-colors hover:bg-white/10">
            ← Back Home
          </Link>
        </div>
      </main>
    </div>
  );
}
