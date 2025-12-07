import { getUserData, getUserRecentlyPlayed } from "@/actions/spotify";
import { UserProfile, RecentlyPlayedResponse } from "@/types/spotify";
import { Users, ExternalLink, Clock, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RoastMe } from "@/components/spotify/RoastMe";
import { LogoutButton } from "@/components/spotify/LogoutButton";

function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}

export default async function SpotifyPage() {
  // Fetch user data from Spotify API
  const userData: UserProfile = await getUserData();
  const userRecentlyPlayed: RecentlyPlayedResponse =
    await getUserRecentlyPlayed();

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      {/* Header / Profile Section */}
      <div className="bg-linear-to-b from-[#1DB954]/80 to-[#121212] pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8">
          {/* Profile Image */}
          <div className="relative size-40 md:size-52 shadow-2xl rounded-full overflow-hidden border-4 border-[#121212]">
            {userData.images?.[0]?.url ? (
              <Image
                src={userData.images[0].url}
                alt={userData.display_name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="size-full bg-[#282828] flex items-center justify-center">
                <Users className="size-20 text-gray-400" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center md:items-start gap-4 flex-1">
            <span className="uppercase tracking-widest text-xs font-bold">
              Profile
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white">
              {userData.display_name}
            </h1>

            <div className="flex items-center gap-6 text-sm font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <Users className="size-4" />
                <span>
                  {userData.followers.total.toLocaleString()} Followers
                </span>
              </div>
              <Badge
                variant="secondary"
                className="bg-[#1DB954] text-black hover:bg-[#1ed760] capitalize">
                {userData.product}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <RoastMe />
            <Button
              asChild
              variant="outline"
              size={"lg"}
              className="rounded-full bg-white/30">
              <Link href={userData.external_urls.spotify} target="_blank">
                Open in Spotify <ExternalLink className="ml-1 size-4" />
              </Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Playlists Section */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Recently Played Section */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <Clock className="size-6 text-[#1DB954]" />
            <h2 className="text-2xl font-bold">Recently Played</h2>
          </div>

          <Card className="bg-[#181818] border-none p-0 overflow-hidden">
            <div className="w-full text-left">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 border-b border-[#282828] text-sm text-gray-400 uppercase tracking-wider">
                <div className="w-8 text-center">#</div>
                <div>Title</div>
                <div className="hidden md:block">Album</div>
                <div className="text-right pr-4">
                  <Clock className="size-4 inline" />
                </div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {userRecentlyPlayed.items.map((item, index) => (
                  <Link
                    href={item.track.external_urls.spotify}
                    key={`${item.track.id}-${item.played_at}`}
                    target="_blank"
                    className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 p-3 items-center hover:bg-[#282828] transition-colors rounded-md mx-2">
                    <div className="w-8 text-center text-gray-400 group-hover:text-white">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play className="size-4 hidden group-hover:inline-block fill-white" />
                    </div>

                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="relative size-10 shrink-0">
                        {item.track.album.images?.[0]?.url && (
                          <Image
                            src={item.track.album.images[0].url}
                            alt={item.track.album.name}
                            fill
                            className="object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-medium text-white truncate group-hover:text-[#1DB954] transition-colors">
                          {item.track.name}
                        </span>
                        <span className="text-sm text-gray-400 truncate group-hover:text-white transition-colors">
                          {item.track.artists.map((a) => a.name).join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block text-sm text-gray-400 truncate group-hover:text-white transition-colors">
                      {item.track.album.name}
                    </div>

                    <div className="text-right text-sm text-gray-400 pr-4 font-mono group-hover:text-white transition-colors">
                      {formatDuration(item.track.duration_ms)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
