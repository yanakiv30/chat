"use client";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteTeam, updateTeam } from "@/apiUtils/apiTeams";

export default function SettingsGroup() {
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
          <button onClick={() => router.push("empty")}>X</button>
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
