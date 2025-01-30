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
      // console.log(data);
      setStockAnalysis(data?.analysis);
      setTickers([data?.analysis?.name]);
    };

    presetScreenStocks();
  }, []);

  return (
    <div className="w-full p-10 mt-10 mx-auto grid max-w-2xl grid-cols-1 gap-10 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      {/* <p>Select a Stock {params.stockId}</p> */}
      {/* <h1>{stockAnalysis?.name}</h1> */}
      {tickers.length > 0 && <Chart tickers={tickers}></Chart>}
      <p className="whitespace-pre-wrap mt-10">{stockAnalysis?.content}</p>
    </div>
  );
}
