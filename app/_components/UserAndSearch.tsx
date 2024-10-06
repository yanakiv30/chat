"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import { setSearchQuery } from "../../store/userSlice";

function UserAndSearch() {
  const dispatch = useDispatch();
  const { searchQuery, loggedInUser } = useAppSelector((store) => store.user);

  return (
    <div className="icon-and-search">
      <input
        style={{ width: "100%", borderRadius: "7px", borderWidth: "1px" }}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder=" Search in chats"
      />
    </div>
  );
}
export default UserAndSearch;
