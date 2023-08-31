"use client";

import React, { useEffect } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  metadata = {
    title: "Couple Chores",
    description: "An app for couples to better plan chores",
  },
}: {
  children: React.ReactNode;
  metadata: Metadata;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>{String(metadata.title)}</title>
        <meta name="theme-color" content="#ADD8E6" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
