"use client";

// import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScreenerProps {}
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

const Screener: FunctionComponent<ScreenerProps> = () => {
  const [screenerData, setScreenerData] = useState<{
    data: Stock[];
    totalCount: number;
  }>();
  const { data: stocks } = screenerData || {};
  useEffect(() => {
    const presetScreenStocks = async () => {
      const response = await fetch("/api/screener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   offset: 1,
        // }),
      });
      const data = await response.json();
      console.log(data);
      setScreenerData(data);
    };

    presetScreenStocks();
  }, []);

  return (
    <Table>
      <TableCaption>Screener</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead className="w-[100px]">Company</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Volume</TableHead>
          <TableHead className="text-right">Market Cap</TableHead>
          <TableHead className="">Sector</TableHead>
          <TableHead className="">Processed</TableHead>
          <TableHead className="">Potential</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks?.map((stock, stockIndex: number) => {
          return (
            <TableRow key={stockIndex}>
              <TableCell className="font-medium">{stockIndex + 1}</TableCell>
              <TableCell className="font-medium">{stock.name}</TableCell>
              <TableCell className="font-medium text-right w-[200px]">
                {stock.close}
              </TableCell>
              <TableCell className="font-medium text-right w-[200px]">
                {stock.volume}
              </TableCell>
              <TableCell className="font-medium text-right w-[200px]">
                {stock.market_cap_basic}
              </TableCell>
              <TableCell className="font-medium">{stock.sector}</TableCell>
              <TableCell className="font-medium">
                {stock.isProcessed ? "yes" : "no"}
              </TableCell>
              <TableCell className="font-medium">{stock.potential}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Screener;
