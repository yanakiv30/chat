"use client";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";

import { deleteTeamById } from "../../store/groupSlice";

import { removeUserFromTeam } from "@/apiUtils/apiTeams_members";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
export default function NonCreatorGroupSettings() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { localTeams } = useAppSelector((store) => store.group);
  const { loggedInUser } = useAppSelector((store) => store.user);
  if (!loggedInUser) router.push("/");
  const idSettings = +params.groupId!;
  const teamToSet = localTeams.find((team) => team.id === idSettings)!;
  let membersArr: any = [];
  teamToSet?.members.map((member) => membersArr.push(member.username));

  async function removeMe(teamId: number, userId: number) {
    try {
      await removeUserFromTeam(teamId, userId);
    } catch (error) {
      console.error("Error removing uder from team:", error);
    }

    dispatch(deleteTeamById(teamId));
    router.push("/empty");
  }

  return (
    <div className="settings">
      <div style={{ backgroundColor: "beige", borderRadius: "7px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          Team: {teamToSet?.name}
          <Link href="/empty" as="/empty">
            <button>X</button>
          </Link>
        </div>
        <p> members: {membersArr.join(", ")}</p>
      </div>
      <br></br>
      <div className="wrapper">
        <button onClick={() => removeMe(idSettings, loggedInUser!.id)}>
          Remove me from the group
        </button>
      </div>
    </div>
  );
}
