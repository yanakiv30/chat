"use client";

import store, { useAppSelector } from "@/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ChatMembersList from "./_components/ChatMembersList";
import LeftSidebar from "./_components/LeftSidebar";

function AppContent({ children }: { children: React.ReactNode }) {
  const { loggedInUser } = useAppSelector((store) => store.user);

  return (
    <div className="app-container" style={{ position: "relative" }}>
      <div className="main-container">
        <LeftSidebar></LeftSidebar>
        {loggedInUser && <ChatMembersList />}
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
  );
}

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
          <AppContent>{children}</AppContent>
        </Provider>
      </body>
    </html>
  );
}
