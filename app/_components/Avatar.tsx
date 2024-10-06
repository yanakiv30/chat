"use client";

import { useState } from "react";

interface AvatarProps {
  name: string | undefined;
  height?: string;
  width?: string;
}
function Avatar({ name, height, width }: AvatarProps) {
  const [isLoading, setIsLoading] = useState(true); // State to track if the image is loading
  const firstLetter = name ? name[0].toUpperCase() : "Z";

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false once the image is loaded
  };

  return (
    <>
      {name?.startsWith("http") ? (
        <>
          {isLoading && <span style={{ color: "beige" }}>***</span>}
          <img
            src={name}
            alt="Profile"
            style={{
              display: isLoading ? "none" : "block", // Hide image until it's loaded
              width: width || "7%",
              height: height || "90%",
              borderRadius: "50%",
            }}
            onLoad={handleImageLoad} // Handle image load
          />
        </>
      ) : (
        <div className="avatar">{firstLetter}</div>
      )}
    </>
  );
}

export default Avatar;
