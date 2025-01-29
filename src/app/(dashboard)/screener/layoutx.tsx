import Screener from "@/components/Screener";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] itemxs-center justxify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <aside className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Uptrend Stocks fsdfsdf Discovery {new Date().toDateString()}</p>
      </aside> */}
      {children}
    </div>
  );
}
