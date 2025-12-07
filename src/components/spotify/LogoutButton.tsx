"use client";

import { logout } from "@/actions/spotify";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      onClick={() => logout()}
      variant="ghost"
      size="lg"
      className="rounded-full text-gray-400 hover:text-white hover:bg-white/10">
      <LogOut className="mr-2 size-4" />
      Logout
    </Button>
  );
}
