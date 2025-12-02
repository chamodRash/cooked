import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-8">
      <main className="flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold text-white">
            🔥 Cooked
          </h1>
          <p className="max-w-md text-lg text-zinc-400">
            The one-stop website for realizing you have terrible taste. Get roasted based on your Spotify, VALORANT, Anime watch history, and more.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-md">
          <Link
            href="/spotify"
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-8 text-xl font-semibold text-white transition-all hover:bg-green-500 hover:scale-105"
          >
            🎵 Connect Spotify
          </Link>

          <Link
            href="/valorant"
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 text-xl font-semibold text-white transition-all hover:bg-red-500 hover:scale-105"
          >
            🎮 Connect VALORANT
          </Link>

          <Link
            href="/anime"
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-purple-600 px-8 text-xl font-semibold text-white transition-all hover:bg-purple-500 hover:scale-105"
          >
            📺 Connect AnimeList
          </Link>
        </div>
      </main>
    </div>
  );
}
