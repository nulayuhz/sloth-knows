"use client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Chart from "./chart";

export default function Page() {
  const params = useParams<any>();
  const [stockAnalysis, setStockAnalysis] = useState({ content: "", name: "" });
  const [tickers, setTickers] = useState<string[]>([]);
  useEffect(() => {
    const presetScreenStocks = async () => {
      const response = await fetch("/api/stock-analysis/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          screenerStockId: Number(params.stockId),
        }),
      });
      const data = await response.json();
      console.log(data);
      setStockAnalysis(data?.analysis);
      setTickers([data?.analysis?.name]);
    };

    presetScreenStocks();
  }, []);

  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <p>Select a Stock {params.stockId}</p> */}
        <h1>{stockAnalysis?.name}</h1>
        {tickers.length > 0 && <Chart tickers={tickers}></Chart>}
        <p className="whitespace-pre-wrap">{stockAnalysis?.content}</p>
      </main>
    </div>
  );
}
