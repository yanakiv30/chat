"use client"

import { useDispatch } from "react-redux";
import { setSearchMessage } from "../../store/userSlice";
import { useAppSelector } from "../../store/store";

function SearchInMessage() {
  const dispatch = useDispatch();
  const { searchMessage } = useAppSelector((store) => store.user);

  return (
    <input
      style={{ width: "40%", borderRadius: "7px" }}
      value={searchMessage}
      onChange={(e) => dispatch(setSearchMessage(e.target.value))}
      placeholder="🔍 Search in messages ..."
    />
  );
}
export default SearchInMessage;
