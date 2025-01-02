import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import Nav from "@/components/Nav";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keep Notes App",
  description: "An app to take notes and to manage them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="bg-cyan-400 text-cyan-900 flex items-center justify-between">
          <h1>
            <Link className="inline-block font-bold text-xl p-4" href="/">
              Keep Notes
            </Link>
          </h1>
          <Nav />
        </header>
        <div className="grow bg-orange-200">{children}</div>
      </body>
    </html>
  );
}
