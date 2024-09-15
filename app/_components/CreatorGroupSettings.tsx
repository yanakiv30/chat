"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "../../store/store";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteTeam, updateTeam } from "@/apiUtils/apiTeams";
import Link from "next/link";

export default function CreatorGroupSettings() {
  const router = useRouter();
  const { groupId } = useParams();
  const idSettings = +groupId!;
  const [updateName, setUpdateName] = useState("");

  const { localTeams } = useAppSelector((store) => store.group);

  const { loggedInUser } = useAppSelector((store) => store.user);
  if (!loggedInUser) router.push("/");
  const teamToSet = localTeams.find((team) => team.id === idSettings)!;
  let membersArr: any = [];
  teamToSet?.members.map((member) => membersArr.push(member.username));

  async function changeGroupName(teamId: number) {
    if (updateName === "") return;

    try {
      await updateTeam(teamId, { name: updateName });
    } catch (error) {
      console.error("Error renaming Team:", error);
    } finally {
    }
  }

  async function deleteGroup(teamId: number) {
    try {
      await deleteTeam(teamId);
    } catch (error) {
      console.error("Error deleting team:", error);
    } finally {
    }
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
        <div>
          <input
            style={{ width: "60%" }}
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                changeGroupName(idSettings!);
              }
            }}
            placeholder="Write new name .."
          />
          <button onClick={() => changeGroupName(idSettings!)}>
            Update name
          </button>
        </div>
        <button onClick={() => deleteGroup(idSettings!)}>
          Delete the entire group
        </button>
      </div>
    </div>
  );
}
