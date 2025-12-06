import { SpotifyLoginButton } from "@/components/SpotifyLoginButton";
import { Button } from "@/components/ui/button";
import { Gamepad, Tv } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-900 to-black p-8">
      <main className="flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold text-white">🔥 Cooked</h1>
          <p className="max-w-md text-lg text-zinc-400">
            The one-stop website for realizing you have terrible taste. Get
            roasted based on your Spotify, VALORANT, Anime watch history, and
            more.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md">
          <SpotifyLoginButton />
          <Button
            variant={"default"}
            size={"lg"}
            className="bg-red-600 text-white h-12 text-lg transition-all hover:scale-105 hover:bg-red-800"
            asChild>
            <Link href="/valorant">
              <Gamepad className="size-8 mr-2" />
              Let&apos;s go with VALORANT
            </Link>
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            className="bg-purple-600 text-white h-12 text-lg transition-all hover:scale-105 hover:bg-purple-800"
            asChild>
            <Link href="/anime">
              <Tv className="size-6 mr-2" />
              Let&apos;s go with AnimeList
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
