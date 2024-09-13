"use client";

import { FaCog } from "react-icons/fa";
import Avatar from "./Avatar";
import { useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsDeleteTeam, Team } from "../../store/groupSlice";
import FlashingDot from "./FlashingDots";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function GroupList() {
  const { groupId } = useParams();
  const actualGroupId = groupId as string;
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedInUser, searchQuery, isLoading } = useAppSelector(
    (store) => store.user
  );

  const { localTeams, teamWithNewMessage, isDeleteTeam } = useAppSelector(
    (store) => store.group
  );

  const [flashedTeamsIdsLog, setFlashedTeamsIdsLog] = useState(
    {} as { [key: number]: number }
  );

  useEffect(() => {
    if (!loggedInUser) {     
      signOut({ callbackUrl: "/" })
        .catch((error) => {
          console.error('Sign out failed:', error);
        });
    }
  }, [loggedInUser]);
  
  const searchedTeams =
    searchQuery.length > 0
      ? localTeams.filter(
          (team) => team && team.name && team.name.includes(searchQuery)
        )
      : localTeams;

  const updateFlashedTeamsIdsLog = (teamId: number, senderId: number) => {
    setFlashedTeamsIdsLog((prev) => ({ ...prev, [teamId]: senderId }));
  };

  searchedTeams.map((team) => {
    const isNewMessage = team.id === teamWithNewMessage.team_id;

    const isTeamId = !Object.keys(flashedTeamsIdsLog).find(
      (id) => +id === team.id
    );

    teamWithNewMessage.sender_id !== loggedInUser!.id &&
      isTeamId &&
      isNewMessage &&
      !isDeleteTeam &&
      +actualGroupId !== team.id &&
      updateFlashedTeamsIdsLog(team.id, teamWithNewMessage.sender_id);
    return null;
  });

  function onTeamClicked(team: Team) {
    dispatch(setIsDeleteTeam(true));
    const newFlashedTeamsIdsLog = { ...flashedTeamsIdsLog };
    delete newFlashedTeamsIdsLog[team.id];
    setFlashedTeamsIdsLog(newFlashedTeamsIdsLog);
    team.name
      ? router.push(`/groups/${team.id}`)
      : router.push(`/messages/${team.id}`);
  }

  return (
    <div>
      <ul>
        {searchedTeams.map((team) => (
          <li key={team.id}>
            <div style={{ display: "flex", gap: "5px" }}>
              <Avatar
                name={
                  team.name === ""
                    ? team.members.find(
                        (member) => +member.id !== loggedInUser?.id
                      )?.avatar
                    : team.name
                }
              />
              <button onClick={() => onTeamClicked(team)}>
                {team.name === ""
                  ? team.members.find(
                      (member) => +member.id !== loggedInUser?.id
                    )?.username
                  : team.name}
              </button>
              {team.members[0]?.id === loggedInUser?.id ? (
                <Link href={`/settingsGroup/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>
                </Link>
              ) : (
                <Link href={`/settingsGroup2/${team.id}`}>
                  <span style={{ fontSize: "8px" }}>
                    <FaCog />
                  </span>
                </Link>
              )}
              {Object.keys(flashedTeamsIdsLog).includes("" + team.id) && (
                <FlashingDot />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
