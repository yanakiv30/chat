"use client"

import { useState } from "react";
import LogoLogout from "./LogoLogout";
import IconAndSearch from "./IconAndSearch";
import AccessibleChats from "./AccessibleChats";
import GroupList from "./GroupList";



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
