import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cooked",
  description: "The one-stop website for realizing you have terrible taste. Roasts you based on your Spotify, VALORANT, Anime watch history, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
