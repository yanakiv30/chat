"use client"

import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { setTeams } from "../../store/groupSlice";
import { getTeams } from "../_services/apiGroups";
import { createTeamWithMembers } from "./createTeam";
import { useRouter } from "next/navigation";



function AccessibleChats() {
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
  async function handleUserClicked(userId: number) {
    const doubleViewGroup = localTeams.find(
      (team) =>
        team.name === "" && team.members.some((user) => user.id === userId)
    );
    if (doubleViewGroup) router.push(`/messages/${doubleViewGroup.id}`);
    else {
      const doubleViewGroupId = await createTeamWithMembers("", [
        loggedInUser!.id,
        userId,
      ]);
      getTeams(+loggedInUser!.id)
        .then((data) => {
          dispatch(setTeams(data));
          router.push(`/messages/${doubleViewGroupId}`);
        })
        .catch((error) => console.error("Error fetching teams", error));
    }
  }

  return (
    <ul>
      {loggedInUser &&
        searchedUsers
          .filter(
            (user) =>
              user.id !== loggedInUser.id &&
              !isUserPartOfEmptyNameTeamWithLoggedInUser(user.id)
          )
          .map((user) => (
            <li key={user.id}>
              <div style={{ display: "flex", gap: "5px" }}>
                <Avatar name={user.avatar} />
                <button onClick={() => handleUserClicked(user.id)}>
                  {user.username}
                </button>
              </div>
            </li>
          ))}
    </ul>
  );
}
export default AccessibleChats;
