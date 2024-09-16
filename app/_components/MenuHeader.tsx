"use client";

import { deleteUser } from "@/apiUtils/apiUsersClient";
import { signOut } from "next-auth/react";
import Link from "next/link";
export default function MenuHeader() {

async function removeMe(){
const {error}= await deleteUser() ;
if (error) {
  console.error("Error deleting user:", error);
} else {  
  signOut({ callbackUrl: "/" });
}
}

  return (
    <div className="button-link">
      <p>🗣️ChatSpa</p>
      <Link
        href={"/groups/createGroups"}
        style={{ border: "2px solid #ccc", borderRadius: "7px" }}
      >
        Create new group
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{ border: "1px solid #ccc", borderRadius: "7px" }}
      >
        Logout
      </button>
      <button
        onClick={removeMe}
        style={{ border: "1px solid #ccc", borderRadius: "7px" }}
      >
        RemoveMe
      </button>
    </div>
  );
}
