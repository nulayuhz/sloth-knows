import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  console.log("create record for analysis", req);

  try {
    const body = await req.json();
    const { screenerStockId, name, content } = body;

    const analysis = await db.stockAnalysis.create({
      data: {
        screenerStockId,
        name,
        content,
      },
    });

    return NextResponse.json({ analysis }, { status: 201 });
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
