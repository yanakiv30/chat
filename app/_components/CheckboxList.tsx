"use client";

import { useState } from "react";

import { useAppSelector } from "../../store/store";

import { useRouter } from "next/navigation";
import { createTeamWithMembers } from "../utils/createTeam";

function CheckboxList() {
  const [groupName, setGroupName] = useState("");
  const [checkedItems, setCheckedItems] = useState({} as CheckedItems);

  const router = useRouter();
  let { users, loggedInUser } = useAppSelector(
    (store) => store.user
  );
  if (!loggedInUser) router.push("/");

  const usersWithoutLoggedIn = users.filter(
    (user) => user.id !== loggedInUser?.id
  );

  type CheckedItems = {
    [key: string]: boolean;
  };

  async function handleSetGroups() {
    if (!loggedInUser || !groupName) {
      console.error("Missing necessary data for group creation.");
      return;
    }

    try {
      await createTeamWithMembers(groupName, checkedIds);
      router.push("/empty");
    } catch (error) {
      console.error("Error creating new group:", error);
    } finally {
    }
  }

  function handleCheckboxChange(id: number) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  }
  const checkedIds = [
    loggedInUser?.id,
    ...Object.keys(checkedItems)
      .filter((key: string) => checkedItems[key] === true)
      .map((key) => +key),
  ].filter((id): id is number => id !== undefined);

  return (
    <div
      style={{ backgroundColor: " rgb(234, 229, 225)", height: "fit-content" }}
      className="wrapper"
    >
      <div
        className="set"
        style={{ border: "1px solid #ccc", borderRadius: "7px" }}
      >
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Create Group </span>
          <button onClick={() => router.push("/empty")}>X</button>
        </p>
        <input
          style={{ width: "fit-content" }}
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter unique name "
        />
        <p>Choose members :</p>
        <ul>
          {usersWithoutLoggedIn.map((user) => (
            <li key={user.id}>
              <input
                type="checkbox"
                id={user.id + ""}
                checked={checkedItems[user.id] || false}
                onChange={() => handleCheckboxChange(user.id)}
              />
              <label>{user.username}</label>
            </li>
          ))}
        </ul>
        <button onClick={handleSetGroups}>Create</button>
      </div>
    </div>
  );
}

export default CheckboxList;
