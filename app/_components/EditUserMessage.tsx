"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import { setIsEditingMessage } from "../../store/userSlice";

import { updateMessage } from "@/apiUtils/apiMessages";

export default function EditUserMessage() {
  const dispatch = useDispatch();
  const {
    editedMessageId: messageId,
    editedMessageContent: mesContent,
    isLoading,
  } = useAppSelector((store) => store.user);

  const [updateContent, setUpdateContent] = useState("");

  async function handleEditMessage(idForEdit: number) {
    dispatch(setIsEditingMessage(true));

    try {
      await updateMessage(idForEdit, updateContent);
    } catch (error) {
      console.error("Error editing message:", error);
    } finally {
    }
  }

  function edit(id: number) {
    handleEditMessage(id);
    dispatch(setIsEditingMessage(false));
  }

  return (
    <div className="message-send">
      <input
        type="text"
        value={updateContent || mesContent || ""}
        onChange={(e) => setUpdateContent(e.target.value || mesContent)}
        placeholder=""
      />

      <button onClick={() => edit(messageId)}>Update message</button>
    </div>
  );
}
