// "use client";
// interface AvatarProps {
//   name: string | undefined;
// }

// function Avatar({ name }: AvatarProps) {
//   const firstLetter = name ? name[0].toUpperCase() : "Z";
 
// console.log("name= ",name);
//   return (
//     <>
//       {name?.startsWith("http") ? (
//         <img
//           src={name}
//           alt="Profile"
//           style={{ width: "7%", height: "90%", borderRadius: "50%" }}
//         />
//       ) : (
//         <div className="avatar">{firstLetter}</div>
//       )}
//     </>
//   );
// }
// export default Avatar;

 "use client";

import { useState } from "react";

 interface AvatarProps {
  name: string | undefined;
}
function Avatar({ name }: AvatarProps) {
  const [isLoading, setIsLoading] = useState(true); // State to track if the image is loading
  const firstLetter = name ? name[0].toUpperCase() : "Z";

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false once the image is loaded
  };  

  return (
    <>
      {name?.startsWith("http") ? (
        <>
          {isLoading && <div>Loading...</div>} {/* Display loading message */}
          <img
            src={name}
            alt="Profile"
            style={{
              display: isLoading ? "none" : "block", // Hide image until it's loaded
              width: "7%",
              height: "90%",
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