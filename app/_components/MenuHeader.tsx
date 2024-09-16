"use client";

import { deleteUser } from "@/apiUtils/apiUsersClient";
import { signOut } from "next-auth/react";
import Link from "next/link";
export default function MenuHeader() {

async function removeMe(){
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  
  if (confirmDelete) {
    try {
      const { error } = await deleteUser();
      if (error) {
        console.error("Error deleting user:", error);
      } else {
        signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
        Remove Account
      </button>
    </div>
  );
}
