"use client"

import { useDispatch } from "react-redux";
import { setIsEdit, setIsLoading } from "../../store/userSlice";
import { useAppSelector } from "../../store/store";
import { useState } from "react";
import Spinner from "./Spinner";
import { updateMessage } from "@/apiUtils/apiMessages";

export default function EditUserMessage() {
  const dispatch = useDispatch();
  const { messageId, mesContent,isLoading } = useAppSelector((store) => store.user);

  const [updateContent, setUpdateContent] = useState("");

  async function handleEditMessage(idForEdit: number) {
    dispatch(setIsEdit(true));
    dispatch(setIsLoading(true));
    try {
      await updateMessage(idForEdit, updateContent);      
    } catch (error) {
      console.error("Error editing message:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function edit(id: number) {
    handleEditMessage(id);
    dispatch(setIsEdit(false));
  }

  return (
    <div className="message-send">
       {isLoading && <Spinner />}
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
