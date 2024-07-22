interface AvatarProps{name:string}

function Avatar({ name }:AvatarProps) {
const firstLetter = name ? name[0].toUpperCase():"Z" ;
  

  return <div className="avatar">{firstLetter}</div>;
}
export default Avatar;



