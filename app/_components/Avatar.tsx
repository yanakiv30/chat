"use client"
interface AvatarProps{name:string|undefined}

function Avatar({ name }:AvatarProps) {
const firstLetter = name ? name[0].toUpperCase():"Z" ;
// return (
//   <div>    
//     <img 
//       src="https://lh3.googleusercontent.com/a/ACg8ocKiv489EF7mIhetpV85Z3ZNa-Tv5thjhYxJgjN6Yd31ctdUe10M=s96-c" 
//       alt="Profile" 
//       style={{ borderRadius: '50%', width:"25%" }} // Optional: To make it circular
//     />
//   </div>
// );

  return <div className="avatar">{firstLetter}</div>;
}
export default Avatar;



