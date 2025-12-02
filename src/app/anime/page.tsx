import Link from "next/link";

export default function AnimePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black p-8">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold text-white">
          📺 AnimeList Connection
        </h1>
        <p className="max-w-md text-lg text-purple-100">
          Connect your anime list to get roasted based on your watch history.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-white transition-colors hover:bg-white/10"
          >
            ← Back Home
          </Link>
        </div>
      </main>
    </div>
  );
}
