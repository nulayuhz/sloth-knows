import { NextResponse } from "next/server";
import { analyzeImage, analyzeMultipleImages } from "./utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { urls } = body;

    const analysis = await analyzeMultipleImages(urls);
    return NextResponse.json({ data: analysis }, { status: 201 });
  } catch (error) {
    console.log("Something went wrong...", error);
  }
}
