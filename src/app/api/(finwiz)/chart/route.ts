import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // add auth check
  try {
    const body = await req.json();
    const { tickers, duration, urlonly } = body;
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
      }),
    });
    console.log(response);
    if (response.ok) {
      console.log(response);
      return NextResponse.json({ data: response }, { status: 201 });
    } else {
      console.log("cannot get chart...");
      return NextResponse.json({ data: response }, { status: 204 });
    }
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
