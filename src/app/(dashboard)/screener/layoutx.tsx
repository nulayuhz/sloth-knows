import Screener from "@/components/Screener";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="test">
      {/* <aside className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Uptrend Stocks fsdfsdf Discovery {new Date().toDateString()}</p>
      </aside> */}
      {children}
    </div>
  );
}
