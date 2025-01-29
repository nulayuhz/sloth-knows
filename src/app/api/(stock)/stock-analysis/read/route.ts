import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  console.log("get analysis by screenersStock id", req);

  try {
    const body = await req.json();
    const { screenerStockId } = body;

    const analysis = await db.stockAnalysis.findFirst({
      where: {
        screenerStockId,
      },
    });

    return NextResponse.json({ analysis }, { status: 201 });
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
