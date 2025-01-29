"use client";

import Screener from "@/components/Screener";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Stock {
  id: number;
  screenerId: number;
  screenerStockId: string;
  name: string;
  description: string;
  close: number;
  volume: string;
  market_cap_basic: string;
  sector: string;
  createdAt: string;
  isProcessed: boolean;
  potential: number;
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  console.log("screener layout");
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    const presetScreenStocks = async () => {
      const response = await fetch("/api/screener", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setStocks(data?.[0].stocks);
    };

    presetScreenStocks();
  }, []);

  const handleRowClick = (stock: Stock) => {
    console.log(stock);
    router.push(`/screener/${stock.screenerId}/stock/${stock.id}`);
  };

  return (
    <div className="flex p-8 pb-20 sm:pt-20 font-[family-name:var(--font-geist-sans)]">
      <aside className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Screener ID Uptrend Stocks Discovery {new Date().toDateString()}</p>
        <Screener stocks={stocks} handleRowClick={handleRowClick} />
      </aside>
      {children}
    </div>
  );
}
