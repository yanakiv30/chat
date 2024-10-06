"use client";

import { useAppSelector } from "../../store/store";

import Avatar from "./Avatar";
import GroupAndLogout from "./GroupAndLogout";

export default function LeftSidebar() {
  const { loggedInUser } = useAppSelector((store) => store.user);

  return (
    loggedInUser && (
      <div className="left-sidebar">
        <p>ChatApp</p>
        <Avatar name={loggedInUser.avatar} height="60px" width="60px" />
        <p style={{ width: "min-content" }}> {loggedInUser.username}</p>
        <GroupAndLogout />
      </div>
    )
  );
}
