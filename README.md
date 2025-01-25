This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The general idea behind this project is to consolidate public trading data from tradingview, finviz, marketwatch, etc in one place, and feed to chatGPT to draw some basic insights, such as resistence/support level, entry price, and identify potential chart patterns. It acts as a helper and/or "virtual analyst" to help beginners to gain basic level of understanding of stock trading and in hope to help developing a general trading sense.

- streamline the screening process by using a set of predefined criteria to filter down stocks with potentials
- set up a cron job, run the screener on market close daily, Monday to Friday, at 4:30PM EST
- with the screener stocks, additional filters may be applied to further narrow down the list; such as:
  - price >= 52 week low by 25%
  - price >= (52 week high) \* 0.75
  - SMA200 is in an uptrend (SMA200 30d > SMA200 60d > SMA200 90d > SMA200 120d)
  - price action is tight (may use recent price range to determine)
  - the final number of stocks should be < 300
- from market close (4:30PM EST) to next market open 9:30AM, there is a 15 hour widow for ChatGPT to analyze the stocks, 300/15 = 20 stocks per hour, 60/20 = 3min per stock
- set up a queue to feed the filtered list of stocks to ChatGPT, it should have some interval in between (1min-3min), so ChatGPT is not flooded
- for each stock, a 12month chart, a RSI, MACD indicator chart, should be sent. An additional 6month chart may also be provided if more detail analysis is required
- based on ChatGPT's feedback, an analysis summary should be stored in database by the {ticker}\_{mm/dd/yyyy}
- nice to have feature: have a top 10-20 picks
- have major events listed to watch out for, such as FED meeting, CPI announcement, stock earning day, etc

## Getting Started

install dependencies, you will need node.js, npm, postgresql, python, installed. after everything installed, run command to install all the packages

```
npm install

```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
