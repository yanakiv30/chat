"use client"
import GroupList from "../Components/GroupList";
import LogoLogout from "../Components/LogoLogout";
import IconAndSearch from "../Components/IconAndSearch";
import AccessibleChats from "../Components/AccessibleChats";
import { useState } from "react";

function ChatMembersList() {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
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
        New Chats
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
