


import { Metadata } from "next";
import Link from "next/link";
import GoogleSignInButton from "./_components/GoogleSignInButton";
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to chatSPA",
};
export default async function HomePage() {
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <div>
        <p style={{ fontSize: "70px" }}>Welcome to Chat</p>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Link href="/login">
            <button style={{ fontSize: "20px" }}>Go to Login</button>
          </Link>
          <span style={{ fontSize: "20px" }}> or </span>
          <GoogleSignInButton px={20}/>        
        </div>
      </div>
    </div>
  );
}


