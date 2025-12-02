import Link from "next/link";

export default function ValorantPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-900 to-black p-8">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold text-white">
          🎮 VALORANT Connection
        </h1>
        <p className="max-w-md text-lg text-red-100">
          Connect your VALORANT account to get roasted based on your gameplay stats.
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
