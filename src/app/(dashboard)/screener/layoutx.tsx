import Screener from "@/components/Screener";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] pt-26.25 lg:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem] lg:pt-14.25 xl:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem]">
      {/* <aside className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Uptrend Stocks fsdfsdf Discovery {new Date().toDateString()}</p>
      </aside> */}
      {children}
    </div>
  );
}
