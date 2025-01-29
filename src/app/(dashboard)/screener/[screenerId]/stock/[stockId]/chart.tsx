"use client";

import Image from "next/image";
import {
  ChatCompletion,
  ChatCompletionMessage,
} from "openai/resources/index.mjs";
import { useEffect, useState } from "react";

export default function Chart({ tickers }: { tickers: string[] }) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const getCharts = async () => {
      const response = await fetch("/api/chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tickers,
          urlOnly: true,
        }),
      });
      const res = await response.json();
      const { data } = res;
      setUrls(data);
    };

    getCharts();
  }, []);

  return (
    <div>
      {urls?.map((url: string) => {
        return (
          <Image
            src={url}
            alt="stock chart"
            width={900}
            height={340}
            key={url}
          />
        );
      })}
    </div>
  );
}
