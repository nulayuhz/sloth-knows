export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-stone-400 p-10 rounded-md">{children}</div>;
}
