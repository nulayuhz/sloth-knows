import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const screenerApi = process.env.FINWIZ_STOCK_SCREENER_API_URL;

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms || 0));
};

const getAllScreenerStocks = async () => {
  if (!screenerApi) {
    throw new Error("please add env variable FINWIZ_STOCK_CHART_API_URL");
  }
  let totalCount = 0;
  const allData = [];

  const response = await getScreenerStocksByOffset(0);

  if (response.ok) {
    const { data, totalCount: count } = await response.json();
    totalCount = count;
    allData.push(...data);
  }
  const pageCount = Math.ceil(totalCount / 50);

  let offset = 1;
  while (offset < pageCount) {
    let response = await getScreenerStocksByOffset(offset);
    if (response.ok) {
      const { data, totalCount: count } = await response.json();
      totalCount = count;
      allData.push(...data);
    }
    sleep(1000);
    offset += 1;
  }
  return { data: allData, totalCount };
};

const getScreenerStocksByOffset = async (offset: number) => {
  if (!screenerApi) {
    throw new Error("please add env variable FINWIZ_STOCK_CHART_API_URL");
  }

  const response = await fetch(screenerApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset,
    }),
  });
  return response;
};

export async function POST() {
  try {
    let start = new Date();
    start.setHours(0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59);
    const existingScreener = await db.screener.findFirst({
      where: {
        AND: [{ createdAt: { gte: start } }, { createdAt: { lte: end } }],
      },
      include: {
        stocks: true,
      },
    });

    const existingScreenerStocksWithBigInt = existingScreener?.stocks.map(
      (stock) =>
        JSON.stringify(stock, (_, v) =>
          typeof v === "bigint" ? v.toString() : v
        )
    );
    if (existingScreener) {
      return NextResponse.json(
        {
          data: existingScreenerStocksWithBigInt,
          totalCount: existingScreener.stocks.length,
        },
        { status: 201 }
      );
    } else {
      console.log("today's screener has not been pulled");

      let allScreenedStocks = await getAllScreenerStocks();
      const newScreener = await db.screener.create({});

      try {
        await db.screenerStock.createMany({
          data: allScreenedStocks.data.map((stock: any) => {
            return {
              name: stock.d[0],
              description: stock.d[1],
              close: stock.d[2],
              volume: stock.d[3],
              market_cap_basic: stock.d[4],
              sector: stock.d[5],
              screenerId: newScreener.id,
              screenerStockId: uuidv4(),
            };
          }),
        });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }

      return NextResponse.json(allScreenedStocks, { status: 201 });
    }
  } catch (error) {
    console.log("Something went wrong...", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
