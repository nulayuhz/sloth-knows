import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const screenerApi = process.env.FINWIZ_STOCK_SCREENER_API_URL;
    if (!screenerApi) {
      throw new Error("please add env variable FINWIZ_STOCK_CHART_API_URL");
    }
    const response = await fetch(screenerApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return NextResponse.json(data, { status: 201 });
    } else {
      console.log("cannot get data...");
    }
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
