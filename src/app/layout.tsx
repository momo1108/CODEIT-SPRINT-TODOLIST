import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/layouts/NavBar";

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col antialiased">
        <NavBar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
