"use client";

import { useState } from "react";

import { useAppSelector } from "../../store/store";
import { searchedGroupMessagesFunc } from "../utils/messageUtils";

import { redirect, useParams } from "next/navigation";
import Avatar from "./Avatar";
import EditUserMessage from "./EditUserMessage";
import Empty from "./Empty";
import SearchInMessage from "./SearchInMessage";
import SendUserMessage from "./SendUserMessage";
import UserMessagesContainer from "./UserMessageContainer";

import { deleteMessage } from "@/apiUtils/apiMessages";

export default function GroupMessages() {
  const {
    loggedInUser,
    searchMessage,
    isEditingMessage: isEdit,
    isLoading,
  } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
  const [newGroupMessage, setNewGroupMessage] = useState("");
  const { groupId } = useParams();
  const groupInListId = +groupId!;
  const team = localTeams.find((x) => x.id === groupInListId);

  if (!team) return <Empty />;
  if (!loggedInUser) redirect("/");
  const otherMember = team.members.find(
    (member) => member.id !== loggedInUser!.id
  );

  async function handleSendGroupMessage(message: string, imagePath?: string) {
    if (message.trim() !== "" || imagePath) {
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            team_id: groupInListId,
            message: message.trim(),
            image_path: imagePath,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create message");
        }

        const data = await response.json();
        // Handle the successful message creation (e.g., update local state)
      } catch (error) {
        console.error("Error creating Group message:", error);
        alert("Error creating Group message: " + error);
      } finally {
      }
      setNewGroupMessage("");
    }
  }

  async function handleDeleteGroupMessages(idForDelete: string) {
    try {
      await deleteMessage(idForDelete);
    } catch (error) {
      console.error("Error deleting group message:", error);
    } finally {
    }
  }

  const searchedGroupMessages = searchedGroupMessagesFunc(
    team.messages || [],
    searchMessage
  );

  return (
    <div className="profile-wrapper">
      <div className="user-profile-container">
        <div className="chat-with">
          <div>
            <div style={{ display: "flex", gap: "5px" }}>
              {team.name === "" && <Avatar name={otherMember?.avatar} />}
              {team.name !== "" && <Avatar name={team.name || ""} />}
              <h4>
                {team.name === ""
                  ? `Chat with  ${otherMember?.username}`
                  : team.name}{" "}
              </h4>
            </div>
            {team.name !== "" && (
              <p style={{ fontSize: "10px", textAlign: "center" }}>
                members: {team.members.map((user) => user.username).join(",")}
              </p>
            )}
          </div>
          <SearchInMessage />
          <img
            style={{ maxWidth: "13%" }}
            src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"
            alt="some cabin"
          />
        </div>
        <UserMessagesContainer
          loggedInUser={loggedInUser}
          userInListId={groupInListId}
          handleDeleteMessages={handleDeleteGroupMessages}
          searchedMessages={searchedGroupMessages}
        />

        {!isEdit ? (
          <SendUserMessage
            newMessage={newGroupMessage}
            setNewMessage={setNewGroupMessage}
            handleSendMessage={handleSendGroupMessage}
          />
        ) : (
          <EditUserMessage />
        )}
      </div>
    </div>
  );
}
