"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { BsSpotify } from "react-icons/bs";

export function SpotifyLoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/api/spotify/authorize");
  };

  return (
    <Button
      onClick={handleLogin}
      variant={"default"}
      size={"lg"}
      className="cursor-pointer bg-green-600 text-white h-12 text-lg transition-all hover:scale-105 hover:opacity-80 hover:bg-green-600">
      <BsSpotify className="size-6 mr-2 inline-block" />
      Connect to Spotify
    </Button>
  );
}
