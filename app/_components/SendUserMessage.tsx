"use client";

import { uploadImage } from "@/apiUtils/apiImages";
import React, { ChangeEvent, useRef, useState } from "react";

interface SendUserMessageProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (message: string, imagePath?: string) => void;
}

const SendUserMessage: React.FC<SendUserMessageProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  const [fileInputKey, setFileInputKey] = useState<string | number>(Date.now());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      const filePath = await uploadImage(selectedFile);
      if (filePath) {
        handleSendMessage(newMessage, filePath);
        setNewMessage("");
        setFileInputKey(Date.now());
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="message-send">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage(newMessage);
              setNewMessage("");
            }
          }}
          placeholder="Type your message..."
        />
        <div className="upload-and-send">
          <input
            key={fileInputKey}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <div style={{ paddingBottom: "10px" }}>
            <button
              onClick={handleUploadClick}
              style={{ margin: "10px", fontSize: "16px" }}
            >
              +
            </button>
            <button
              onClick={() => {
                handleSendMessage(newMessage);
                setNewMessage("");
              }}
              style={{ fontSize: "16px" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendUserMessage;
