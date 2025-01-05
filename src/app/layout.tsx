import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Suspense } from "react";

import { StoreProvider } from "@redux/provider";
import { Toaster } from "@utils/toast-provider";

import LeftNavigation from "@components/left-navigation";
import TopSearchBar from "@components/top-search-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <div className="flex flex-col">
            <TopSearchBar />
            <div className="flex">
              <LeftNavigation />
              <main className="ml-60 mt-16 h-screen flex-1 bg-gray-50 p-4">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
