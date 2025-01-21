import { downloadImage } from "@/lib/fs-helpers";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  // add auth check
  try {
    const body = await req.json();
    const { tickers, duration, urlOnly } = body;
    const chartApi = process.env.FINWIZ_API_URL + "/stock-chart";
    console.log(chartApi);
    // const response = await fetch(chartApi);
    const response = await fetch(chartApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tickers,
        duration,
        urlOnly,
      }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // return NextResponse.json({ data: response }, { status: 201 });

      const downloadPromises = data.map((url: string, index: number) => {
        const filename = `${tickers[index]}-${new Date().toDateString()}.jpg`;
        return downloadImage(url, filename);
      });

      const downloadedFiles = await Promise.all(downloadPromises);

      return NextResponse.json({ data: downloadedFiles }, { status: 201 });
    } else {
      console.log("cannot get chart...");
      // return NextResponse.json({ data: response }, { status: 204 });
    }
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
