import { getUserData, getUserPlaylists } from "@/actions/spotify";
import { UserPlaylistsResponse, UserProfile } from "@/types/spotify";
import { Music, Users, ExternalLink, Disc } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default async function SpotifyPage() {
  // Fetch user data from Spotify API
  const userData: UserProfile = await getUserData();
  const userPlaylist: UserPlaylistsResponse = await getUserPlaylists();

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
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full">
              <Link href={userData.external_urls.spotify} target="_blank">
                Open in Spotify <ExternalLink className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-gray-400 hover:text-white rounded-full">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Playlists Section */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Music className="size-6 text-[#1DB954]" />
          <h2 className="text-2xl font-bold">Your Playlists</h2>
        </div>

        {userPlaylist.items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Disc className="size-16 mx-auto mb-4 opacity-50" />
            <p>No playlists found in your library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {userPlaylist.items.map((playlist) => (
              <Link
                href={playlist.external_urls.spotify}
                key={playlist.id}
                target="_blank"
                className="group">
                <Card className="bg-[#181818] border-none hover:bg-[#282828] transition-all duration-300 h-full overflow-hidden group-hover:shadow-xl">
                  <CardContent className="p-4 pb-2">
                    <div className="relative aspect-square w-full mb-4 shadow-lg rounded-md overflow-hidden bg-[#333]">
                      {playlist.images?.[0]?.url ? (
                        <Image
                          src={playlist.images[0].url}
                          alt={playlist.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center">
                          <Music className="size-12 text-gray-500" />
                        </div>
                      )}
                      {/* Play Button Overlay */}
                      <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                        <div className="bg-[#1DB954] rounded-full p-3 text-black hover:scale-105 hover:bg-[#1ed760]">
                          <ExternalLink className="size-5 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3
                      className="font-bold text-white truncate mb-1"
                      title={playlist.name}>
                      {playlist.name}
                    </h3>
                    <p
                      className="text-sm text-[#a7a7a7] line-clamp-2 min-h-[2.5em]"
                      title={playlist.description}>
                      {playlist.description ||
                        `By ${playlist.owner.display_name}`}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Badge
                      variant="secondary"
                      className="bg-[#ffffff10] text-xs text-gray-300 hover:bg-[#ffffff20]">
                      {playlist.tracks.total} Tracks
                    </Badge>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
