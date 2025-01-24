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
  d: (string | number)[];
  s: string;
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
        body: JSON.stringify({
          offset: 1,
        }),
      });
      const data = await response.json();
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
          <TableHead className="w-[500px]">Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead className="">Sector</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks?.map((stock, stockIndex: number) => {
          return (
            <>
              <TableRow key={stock.d[0]}>
                <TableCell className="font-medium" key="count">
                  {stockIndex + 1}
                </TableCell>
                <TableCell className="font-medium" key="name">
                  {stock.d[0]} {stock.d[1]}
                </TableCell>
                {stock.d.map((col, index: number) => {
                  return (
                    index > 1 && (
                      <TableCell key={index + "col"}>
                        {stock.d[index]}
                      </TableCell>
                    )
                  );
                })}
              </TableRow>
            </>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Screener;
