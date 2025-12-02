import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Anime API endpoint",
    status: "ready",
  });
}
