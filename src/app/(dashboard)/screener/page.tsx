"use client";

import Screener from "@/components/Screener";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";

export default function Page() {
  const [screener, setScreener] = useState({ id: 0 });
  useEffect(() => {
    const presetScreenStocks = async () => {
      const response = await fetch("/api/screener", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setScreener(data?.[0]);
    };

    presetScreenStocks();
  }, []);

  return (
    <div className="mt-20 ml-20 items-center sm:items-start">
      {/* <p>Uptrend Stocks Discovery {new Date().toDateString()}</p>
      <Screener /> */}
      {/* <Screener stocks={stocks} /> */}
      <Link href={`screener/${screener.id}`}>Latest batch</Link>
    </div>
  );
}
