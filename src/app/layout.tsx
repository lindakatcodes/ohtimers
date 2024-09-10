import type { Metadata } from "next";
import "./globals.css";

import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Once Human Timers",
  description:
    "The weekly and hourly timers you should know but can't remember",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-stone-900 text-stone-200 py-6 px-3">
      <body className={`${figtree.className} antialiased`}>{children}</body>
    </html>
  );
}
