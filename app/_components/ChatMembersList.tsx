"use client";

import { useCallback, useEffect, useState } from "react";
import LogoLogout from "./LogoLogout";
import IconAndSearch from "./IconAndSearch";
import AccessibleChats from "./AccessibleChats";
import GroupList from "./GroupList";
import { fetchTeams } from "@/apiUtils/apiTeams";
import { fetchUsersClient } from "@/apiUtils/apiUsersClient";
import { setTeams } from "@/store/groupSlice";
import { useAppSelector } from "@/store/store";
import { setUsers } from "@/store/userSlice";
import { useDispatch } from "react-redux";

function ChatMembersList() {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);

  const loadTeams = useCallback(() => {
    if (!loggedInUser) return;
    return fetchTeams()
      .then((data) => dispatch(setTeams(data)))
      .catch((error) => console.error("Error fetching teams", error));
  }, [dispatch, loggedInUser]);

  const loadUsers = useCallback(() => {
    return fetchUsersClient()
      .then((data) => {
        dispatch(setUsers(data));
      })
      .catch((error) => console.error("Error fetching users", error));
  }, [dispatch]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  useEffect(() => {
    let pollingRequestFinish = true;
    const interval = setInterval(async () => {
      if (!pollingRequestFinish) return;
      console.log("polling");
      pollingRequestFinish = false;
      await loadUsers();
      await loadTeams();
      pollingRequestFinish = true;
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [loadTeams, loadUsers]);
  return (
    <div className="user-list-container">
      <LogoLogout />
      <br></br>
      <IconAndSearch />
      <br></br>
      <button
        onClick={() => setIsNewChatOpen(!isNewChatOpen)}
        style={{ background: "purple", color: "white" }}
      >
        Available Chats
      </button>
      {isNewChatOpen && <AccessibleChats />}
      <br></br>
      <p>My Chats</p>
      <GroupList />

      <img
        style={{ maxWidth: "70%" }}
        src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"
        alt="some cabin"
      />
    </div>
  );
}
export default ChatMembersList;
