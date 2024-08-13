"use client";
interface AvatarProps {
  name: string | undefined;
}

function Avatar({ name }: AvatarProps) {
  const firstLetter = name ? name[0].toUpperCase() : "Z";
  // return (
  //   <div>
  //     <img
  //       src={name}
  //       alt="Profile"
  //       style={{ borderRadius: '50%', width:"25%" }} // Optional: To make it circular
  //     />
  //   </div>
  // );

  return (
    <>
      {name?.startsWith("http") ? (
        <img
          src={name}
          alt="Profile"
          style={{ width: "8%", height: "8%", borderRadius: "50%" }}
        />
      ) : (
        <div className="avatar">{firstLetter}</div>
      )}
    </>
  );
}
export default Avatar;
