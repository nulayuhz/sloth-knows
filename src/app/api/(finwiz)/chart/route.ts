import { downloadImage } from "@/lib/fs-helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log(req);
  // add auth check
  try {
    const body = await req.json();
    const { tickers, duration, urlOnly, downloadChart } = body;
    const chartApi = process.env.FINWIZ_STOCK_CHART_API_URL;
    if (!chartApi) {
      throw new Error("please add env variable FINWIZ_STOCK_CHART_API_URL");
    }
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
    if (response.ok) {
      const imageUrls = await response.json();
      if (downloadChart) {
        const downloadPromises = imageUrls?.map(
          (url: string, index: number) => {
            const filename = `${
              tickers[index]
            }-${new Date().toDateString()}.jpg`;
            return downloadImage(url, filename);
          }
        );

        const downloadedFiles = await Promise.all(downloadPromises);
      }

      return NextResponse.json({ data: imageUrls }, { status: 201 });
    } else {
      console.log("cannot get chart...");
      // return NextResponse.json({ data: response }, { status: 204 });
    }
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
