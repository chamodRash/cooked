"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { BsSpotify } from "react-icons/bs";
import { Loader2 } from "lucide-react";

export function SpotifyLoginButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    router.push("/api/spotify/authorize");
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      variant={"default"}
      size={"lg"}
      className="cursor-pointer bg-green-600 text-white h-12 text-lg transition-all hover:scale-105 hover:opacity-80 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
      {isLoading ? (
        <Loader2 className="size-6 mr-2 animate-spin" />
      ) : (
        <BsSpotify className="size-6 mr-2 inline-block" />
      )}
      {isLoading ? "Connecting..." : "Connect to Spotify"}
    </Button>
  );
}
