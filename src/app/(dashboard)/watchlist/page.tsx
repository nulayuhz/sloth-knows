import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Chart from "./chart";

export default async function Page() {
  const session = await getServerSession(authOptions);

  // const result = await analyzeMultipleImages(imageUrls);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Watchlists!!!</p>
        <Chart />
      </main>
    </div>
  );
}
