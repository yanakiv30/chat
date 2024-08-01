"use client"
interface AvatarProps{name:string|undefined}

function Avatar({ name }:AvatarProps) {
const firstLetter = name ? name[0].toUpperCase():"Z" ;
  

  return <div className="avatar">{firstLetter}</div>;
}
export default Avatar;



