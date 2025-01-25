import cron from "node-cron";

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
// 30 16 * * 1-5

const task = cron.schedule("30 16 * * 1-5", async () => {
  console.log("running at 4:30PM Mon-Fri");
  const stocks = await getScreenerStocks();
  console.log(stocks);
  // call screener api
  // store in db: ticker, date, screenId = ticker+date,
  // push result into bullmq
});

task.start();
