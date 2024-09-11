"use client";
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";

export default function LoginForm() {  
  const { loggedInUser } = useAppSelector((store) => store.user);
  if (loggedInUser) return null;

  return (
    <div className="background-login">
       <p style={{ fontSize: "60px" }}>Return to Chat</p> 
       
        <Link href="/api/auth/signin" passHref>
          <GoogleSignInButton px={14} />
          
        </Link>
       
    </div>
  );
}


