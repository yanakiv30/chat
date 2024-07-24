
import { Metadata } from "next";
import Link from 'next/link';
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to chatSPA",
};
export default async function HomePage() {
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <p style={{fontSize:"50px"}}>Welcome to Chat</p>
      <Link href="/login">
        <button >
          Go to Login
        </button>
      </Link>
      
    </div>
  );
}