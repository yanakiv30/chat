"use client"

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rightMessage } from "../utils/messageUtils";
import { setIsEdit, setMesContent, setMessageId } from "../../store/userSlice";
import { useAppSelector } from "../../store/store";
import { Message } from "../../store/groupSlice";
import { deleteImage, getImageUrl } from "../api/images/route";
//import getImageUrl from "../utils/getImageUrl";
//import deleteImage from "../utils/deleteImage";

export default function UserMessagesContainer({
  loggedInUser,
  userInListId,
  handleDeleteMessages,
  searchedMessages,
}: any) {
  const dispatch = useDispatch();
  const { messageId, users } = useAppSelector((store) => store.user);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
 // console.log("users from UserMessageContainer= ", users);
 
  
  useEffect(() => {
    const messageContent = searchedMessages.filter(
      (message: any) => message.id === messageId
    )[0]?.content;

    dispatch(setMesContent(messageContent));
  }, [messageId, searchedMessages, dispatch]);

  if (!Array.isArray(searchedMessages)) {
    return <div>No messages found</div>;
  }

  async function handleDeleteMessageWithImage(
    messageId: number,
    imagePath?: string
  ) {
    if (imagePath) {
      const imageDeleted = await deleteImage(imagePath);
      if (!imageDeleted) {
        console.error("Failed to delete image");
        return;
      }
    }
    handleDeleteMessages(messageId);
  }

  function editOnId(messageId: number) {
    dispatch(setMessageId(messageId));
    dispatch(setIsEdit(true));
  }

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(getImageUrl(imagePath));
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="messages-container">
      <ul className="messages-container">
        {searchedMessages.map((message: Message, index) => {
         //  {console.log("message.senderId= ", message.senderId)}
          return (
            <div
              className={`${
                rightMessage(message, loggedInUser, userInListId)
                  ? "message-right"
                  : "message-left"
              }`}
              key={message.id}
            >
              <p className="day-date">
                {searchedMessages[index - 1]?.dayDate ===
                searchedMessages[index].dayDate
                  ? ""
                  : message.dayDate}
              </p>
              <br />

              <li className="message">
                {message.image_path && (
                  <div style={{ width: "75px", height: "75px" }}>
                    <img
                      src={getImageUrl(message.image_path) || undefined}
                      alt="Uploaded"
                      style={{
                        maxWidth: "100%",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(message.image_path)}
                    />
                  </div>
                )}

                <div
                  style={{
                    width: "150px",
                    height: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowY: "auto",
                  }}
                >
                  <p style={{ color: "blue" }}>
                   
                    {                      
                      users.filter((user) => user.id === message.senderId)[0]?.username
                    }
                    :
                  </p>
                  <p>{message.content}</p>
                  <br />
                  <p className="date">{message.hourMinDate}</p>
                  {rightMessage(message, loggedInUser, userInListId) && (
                    <div style={{ display: "flex", gap: "7px" }}>
                      <button
                        className="date"
                        onClick={() => editOnId(message.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="date"
                        onClick={() =>
                          handleDeleteMessageWithImage(
                            message.id,
                            message.image_path
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </div>
          );
        })}
      </ul>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="enlarged-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
