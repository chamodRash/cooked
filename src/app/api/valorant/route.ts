import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "VALORANT API endpoint",
    status: "ready",
  });
}
