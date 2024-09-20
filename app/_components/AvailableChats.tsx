"use client";

import { fetchTeams } from "@/apiUtils/apiTeams";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTeams } from "../../store/groupSlice";
import { useAppSelector } from "../../store/store";
import { createTeamWithMembers } from "../utils/createTeam";
import Avatar from "./Avatar";

function AvailableChats() {
  const [disabledUserId, setDisabledUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const { searchQuery, users, loggedInUser } = useAppSelector(
    (store) => store.user
  );
  const { localTeams } = useAppSelector((store) => store.group);
  const router = useRouter();
  const dispatch = useDispatch();

  const searchedUsers =
    searchQuery.length > 0
      ? users.filter(
          (user) => user && user.username && user.username.includes(searchQuery)
        )
      : users;

  function isUserPartOfEmptyNameTeamWithLoggedInUser(userId: number) {
    return localTeams.some(
      (team) =>
        !team.name && team.members.some((member) => member.id === userId)
    );
  }

  const filteredUsers = searchedUsers.filter(
    (user) =>
      loggedInUser &&
      user.id !== loggedInUser.id &&
      !isUserPartOfEmptyNameTeamWithLoggedInUser(user.id)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  async function handleUserClicked(userId: number) {
    if (disabledUserId === userId) return;
    setDisabledUserId(userId);

    try {
      const doubleViewGroup = localTeams.find(
        (team) =>
          team.name === "" && team.members.some((user) => user.id === userId)
      );

      if (doubleViewGroup) {
        router.push(`/messages/${doubleViewGroup.id}`);
      } else {
        const doubleViewGroupId = await createTeamWithMembers("", [
          loggedInUser!.id,
          userId,
        ]);
        const data = await fetchTeams();
        dispatch(setTeams(data));
        router.push(`/messages/${doubleViewGroupId}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setDisabledUserId(null);
    }
  }

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>


      <ul>
        {currentUsers.map((user) => (
          <li key={user.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar name={user.avatar} />
              <button
                onClick={() => handleUserClicked(user.id)}
                disabled={disabledUserId === user.id}
              >
                {user.username}
              </button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default AvailableChats;
