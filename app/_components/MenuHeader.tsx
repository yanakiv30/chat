"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
export default function MenuHeader() {
  return (
    <div className="button-link">
      <p>🗣️ChatSpa</p>

      <Link href={"/groups/createGroups"}>Create group</Link>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{ border: "1px solid #ccc", borderRadius: "7px" }}
      >
        Logout
      </button>
    </div>
  );
}
