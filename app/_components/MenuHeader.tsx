"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
export default function MenuHeader() {
  const dispatch = useDispatch();
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
    </div>
  );
}
