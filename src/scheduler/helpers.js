export const getStockCharts = async (tickers) => {
  const response = await fetch("http://localhost:3000/api/chart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tickers: [tickers],
      urlOnly: true,
    }),
  });
  const data = await response.json();
  return data;
};

export const analyzeStock = async (charts) => {
  const response = await fetch("http://localhost:3000/api/analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urls: charts,
    }),
  });
  const data = await response.json();
  return data;
};

export const markStockAsProcessed = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/screener-stock/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isProcessed: true,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createAnalysis = async (stockId, ticker, analysis) => {
  // console.log(stockId, ticker, analysis);
  const { data } = analysis;
  const { message } = data;
  const { content } = message;
  // console.log(content);
  const response = await fetch(
    `http://localhost:3000/api/stock-analysis/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        screenerStockId: stockId,
        name: ticker,
        content: content,
      }),
    }
  );
  return await response.json();
};

export const getScreenerStocks = async () => {
  const response = await fetch("http://localhost:3000/api/screener", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   offset: 1,
    // }),
  });
  const data = await response.json();
  return data;
};
