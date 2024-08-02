"use client";
import store from "@/store/store";
import { Provider } from "react-redux";
import "./App.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/web_5215661.png" />
      </Head>

      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
