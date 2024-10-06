"use client";

import { deleteUser } from "@/apiUtils/apiUsersClient";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function GroupAndLogout() {
  async function removeMe() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your ac>count?"
    );

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
    <>
      <button>
        <Link href={"/groups/createGroups"}>Create group</Link>
      </button>

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
        Delete My Account
      </button>
    </>
  );
}
