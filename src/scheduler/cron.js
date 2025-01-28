import cron from "node-cron";
import { Queue, Worker } from "bullmq";

// remember to turn on redis first
// on Windows, open PowerShell
// run wsl
// run sudo service redis-server start

// Create a new connection in every instance
export const analyzeQueue = new Queue("analyzeQueue", {
  connection: {
    host: process.env.REDIS_URL,
    port: 6379,
  },
});

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms || 0));
};

const getStockCharts = async (tickers) => {
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

const analyzeStock = async (charts) => {
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

const analyzeWorker = new Worker(
  "analyzeQueue",
  async (job) => {
    console.log(job.data);
    const data = JSON.parse(job.data);
    console.log(data.id, data.name);
    const ticker = data.name;

    console.log("getting charts for", ticker);
    const charts = await getStockCharts(ticker);
    console.log(charts);

    console.log("analyzing", ticker);
    const analysis = await analyzeStock(charts.data);
    console.log(analysis);
  },
  {
    connection: {
      host: process.env.REDIS_URL,
      port: 6379,
    },
    limiter: {
      max: 1,
    },
  }
);

analyzeWorker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

analyzeWorker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

const getScreenerStocks = async () => {
  const response = await fetch("http://localhost:3000/api/screener", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset: 1,
    }),
  });
  const data = await response.json();
  return data;
};

// node-cron DOC: https://github.com/node-cron/node-cron
// second 	0-59 (optional)
// minute 	0-59
// hour 	0-23
// day of month 	1-31
// month 	1-12 (or names)
// day of week 	0-7 (or names, 0 or 7 are sunday)
// 4:30PM Mon-Fri: 30 16 * * 1-5

const task = cron.schedule("* * * * 1-5", async () => {
  console.log("running at 4:30PM Mon-Fri");
  // store in db: ticker, date, screenId = ticker+date,
  const stocks = await getScreenerStocks();
  // console.log(stocks);

  let i = 0;
  while (i < stocks.totalCount) {
    console.log("pushing to queue...", i);
    await analyzeQueue.add(
      "analyzeChart",
      stocks.data[i],
      { removeOnComplete: true, removeOnFail: true }
      // { delay: 2000 }
    );
    await sleep(10 * 1000); // throttle job to process to one every 3min
    i += 1;
  }
});

task.start();

// clean up
// await analyzeQueue.obliterate();
// console.log("drained all");
