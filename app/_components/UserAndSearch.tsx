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
      {loggedInUser && <Avatar name={loggedInUser.avatar} />}
      <p>{loggedInUser && loggedInUser.username}</p>

      <input
        style={{ width: "60%", borderRadius: "7px" }}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder=" 🔍 Search in users or groups"
      />
    </div>
  );
}
export default UserAndSearch;
