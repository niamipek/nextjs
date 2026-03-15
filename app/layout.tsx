import type { Metadata } from "next";
import "./variable.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Enterprise sales dashboard mockup",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
