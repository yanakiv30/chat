"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import { setSearchQuery } from "../../store/userSlice";
import Avatar from "./Avatar";

function UserAndSearch() {
  const dispatch = useDispatch();
  const { searchQuery, loggedInUser } = useAppSelector((store) => store.user);

  return (
    <div className="icon-and-search">
      
      <Avatar name={loggedInUser?.avatar} />{loggedInUser?.username}

      <input
        style={{ width: "60%", borderRadius: "7px" }}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder=" 🔍 Search in chats"
      />
    </div>
  );
}
export default UserAndSearch;
