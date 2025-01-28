import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = await request.json();
  const { id } = await params;

  try {
    const existingScreener = await db.screenerStock.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(body);
    if (!existingScreener) {
      return NextResponse.json({ data: "stock not found" }, { status: 400 });
    }

    const updateUser = await db.screenerStock.update({
      where: {
        id: Number(id),
      },
      data: body,
    });

    return NextResponse.json(updateUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
