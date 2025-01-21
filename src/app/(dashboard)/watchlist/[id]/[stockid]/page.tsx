import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface Props {
  params: { stockid: string };
}

export default async function Page({ params }: Props) {
  const session = await getServerSession(authOptions);
  console.log("params", params);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Stock {params.stockid}</p>
      </main>
    </div>
  );
}
