"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import ChatMembersList from "./_components/ChatMembersList";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/web_5215661.png" />
      </head>
      <body>
        <Provider store={store}>
          <div className="app-container" style={{ position: "relative" }}>
            <div className="main-container">
              <ChatMembersList />
              {children}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}