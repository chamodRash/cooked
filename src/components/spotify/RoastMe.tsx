"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateRoast } from "@/actions/roast";
import { Loader2, Flame, RefreshCw } from "lucide-react";

export function RoastMe() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roast, setRoast] = useState<string | null>(null);
  const [model, setModel] = useState("gemini-2.5-flash");

  const handleRoast = async () => {
    setIsLoading(true);
    setRoast(null);

    try {
      const result = await generateRoast(model);
      if (result.success && result.roast) {
        setRoast(result.roast);
      } else {
        setRoast(result.roast!);
      }
    } catch (error) {
      console.error("Error generating roast:", error);
      setRoast("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !roast) {
      handleRoast();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="rounded-full cursor-pointer bg-[#1DB954] text-black hover:bg-[#1ed760] font-bold transition-transform hover:scale-105">
          <Flame className="mr-2 size-5" /> Roast Me
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#121212] border-[#282828] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-[#1DB954]">
            <Flame className="fill-current" /> AI Roast
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Based on your questionable music taste...
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pt-2">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-full bg-[#181818] border-[#282828] text-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent className="bg-[#181818] border-[#282828] text-white">
              <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
              <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
              <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
              <SelectItem value="gemini-3-pro-preview">Gemini 3 Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-h-[200px] flex flex-col items-center justify-center p-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="size-12 text-[#1DB954] animate-spin" />
              <p className="text-gray-400 animate-pulse">
                Analyzing your bad taste...
              </p>
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="bg-[#181818] p-6 rounded-lg border border-[#282828] shadow-inner">
                <p className="text-lg leading-relaxed text-gray-200 font-medium">
                  {roast}
                </p>
              </div>

              <Button
                onClick={handleRoast}
                className="w-full bg-white text-black hover:bg-gray-200 font-bold">
                <RefreshCw className="mr-2 size-4" /> Roast Me Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
