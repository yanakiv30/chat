"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Message } from "../../store/groupSlice";
import { useAppSelector } from "../../store/store";
import {
  setEditedMessageContent,
  setEditedMessageId,
  setIsEditingMessage,
} from "../../store/userSlice";
import { rightMessage } from "../utils/messageUtils";

export default function UserMessagesContainer({
  loggedInUser,
  userInListId,
  handleDeleteMessages,
  searchedMessages,
}: any) {
  const dispatch = useDispatch();
  const { editedMessageId: messageId, users } = useAppSelector(
    (store) => store.user
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const messageContent = searchedMessages.find(
      (message: any) => message.id === messageId
    )?.content;

    if (messageContent !== undefined) {
      dispatch(setEditedMessageContent(messageContent));
    }
  }, [messageId, searchedMessages, dispatch]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const newImageUrls: Record<string, string> = {};
      for (const message of searchedMessages) {
        if (message.image_path) {
          try {
            const response = await fetch(
              `/api/images?path=${encodeURIComponent(message.image_path)}`
            );
            if (response.ok) {
              const data = await response.json();
              newImageUrls[message.image_path] = data.url;
            }
          } catch (error) {
            console.error("Error fetching image URL:", error);
          }
        }
      }
      setImageUrls(newImageUrls);
    };

    fetchImageUrls();
  }, [searchedMessages]);

  if (!Array.isArray(searchedMessages)) {
    return <div>No messages found</div>;
  }

  async function handleDeleteMessageWithImage(
    messageId: number,
    imagePath?: string
  ) {
    if (imagePath) {
      try {
        const response = await fetch(
          `/api/images?path=${encodeURIComponent(imagePath)}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete image");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        return;
      }
    }
    handleDeleteMessages(messageId);
  }

  function editOnId(messageId: number) {
    dispatch(setEditedMessageId(messageId));
    dispatch(setIsEditingMessage(true));
  }

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imageUrls[imagePath] || null);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="messages-container">
      <ul className="messages-container">
        {searchedMessages.map((message: Message, index) => (
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
              {message.image_path && imageUrls[message.image_path] && (
                <div style={{ width: "75px", height: "75px" }}>
                  <img
                    src={imageUrls[message.image_path]}
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
                    users.find((user: any) => user.id === message.senderId)
                      ?.username
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
        ))}
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
