"use client"

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
//import supabase from "../services/supabase";
import { setIsLoading } from "../../store/userSlice";
import { useState } from "react";
import { supabase } from "../_services/supabase";
import { useRouter } from "next/navigation";
export default function SettingsGroup() {
  const params = useParams();
  const [updateName, setUpdateName] = useState("");
 const router = useRouter();
  const dispatch = useDispatch();
  const { localTeams } = useAppSelector((store) => store.group);
  const { loggedInUser } = useAppSelector((store) => store.user);
  const idSettings = +params.groupId!;
  const teamToSet = localTeams.find((team) => team.id === idSettings)!;
  let membersArr: any = [];
  teamToSet?.members.map((member) => membersArr.push(member.username));

  async function changeGroupName(teamId: number) {
    if (updateName === "") return;
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("teams")
        .update({ name: `${updateName}` })
        .eq("id", teamId)
        .select();
      if (error) {
        console.error(error);
        throw new Error("Team could not be renamed");
      }
    } catch (error) {
      console.error("Error renaming Team:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function deleteGroup(teamId: number) {
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase.from("teams").delete().eq("id", teamId);
      if (error) {
        console.error(error);
        throw new Error("Team could not be deleted");
      }
    } catch (error) {
      console.error("Error deleting team:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
    router.push("/");
  }

  return (
    <div className="settings">
      <div style={{ backgroundColor: "beige", borderRadius: "7px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          Team: {teamToSet?.name}
          <button onClick={() => router.push("/")}>X</button>
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
