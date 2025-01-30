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
      // console.log(data);
      setStocks(data?.[0].stocks);
    };

    presetScreenStocks();
  }, []);

  const handleRowClick = (stock: Stock) => {
    router.push(`/screener/${stock.screenerId}/stock/${stock.id}`);
  };
  // grid-rows-[1fr_1px_auto_1px_auto]
  return (
    <div className="grid min-h-dvh grid-cols-[900px_1fr] grid-rows-[1fr_1px_auto_1px_auto] gap-10 pt-4">
      <aside className="relative col-start-1 row-span-full row-start-1">
        <div className="inset-0 absolute">
          <div className="sticky top-14 bottom-0 left-0 h-full max-h-[calc(100dvh-75px)] w-2xs overflow-y-auto p-6">
            <div>
              <p>Uptrend Stocks Discovery {new Date().toDateString()}</p>
              <Screener stocks={stocks} handleRowClick={handleRowClick} />
            </div>
          </div>
        </div>
      </aside>
      <main className="relative grid grid-cols-subgrid">{children}</main>
    </div>
  );
}
