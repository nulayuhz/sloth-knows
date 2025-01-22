"use client";

import Image from "next/image";
import {
  ChatCompletion,
  ChatCompletionMessage,
} from "openai/resources/index.mjs";
import { useEffect, useState } from "react";

export default function Chart() {
  const tickers = ["sofi"];
  const [urls, setUrls] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<ChatCompletion.Choice>();

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
    console.log("CHART!!!!");
  }, []);

  useEffect(() => {
    const analyzeChart = async () => {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls,
        }),
      });
      const res = await response.json();
      const { data } = res;
      console.log(data);
      setAnalysis(data);
    };

    if (urls.length > 0) {
      analyzeChart();
    }
  }, [urls]);

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

      <p className="whitespace-pre-wrap">{analysis?.message?.content}</p>
    </div>
  );
}
