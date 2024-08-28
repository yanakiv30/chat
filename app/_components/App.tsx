"use client";

import { useCallback, useEffect } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  setIsDeleteTeam,
  setTeams,
  setTeamWithNewMessage,
} from "@/store/groupSlice";
import { useAppSelector } from "@/store/store";
import { setUsers } from "@/store/userSlice";
import { toast } from "react-toastify";
import { supabase } from "../_services/supabase";
import { redirect } from "next/navigation";
import Empty from "./Empty";
import { fetchUsers } from "@/apiUtils/apiUsers";
import { fetchTeams } from "@/apiUtils/apiTeams";
type UserSup = {
  username: string;
  id: number;
  avatar: string;
  status: string;
  created_at: string;
};
interface AppProps {
  initialUsers: UserSup[];
}
function App({ initialUsers }: AppProps) {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);

  const loadTeams = useCallback(() => {
    if (!loggedInUser) return;
    fetchTeams(+loggedInUser.id)
      .then((data) => dispatch(setTeams(data)))
      .catch((error) => console.error("Error fetching teams", error));
  }, [dispatch, loggedInUser]);

  const loadUsers = useCallback(() => {
    fetchUsers()
      .then((data) => {
        dispatch(setUsers(data));
      })
      .catch((error) => console.error("Error fetching users", error));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUsers(initialUsers));
    loadTeams();
  }, [initialUsers, dispatch, loadTeams]);

  useEffect(() => {
    const findTeamNameById = (id: number, senderId: number) => {
      const team = localTeams.find((team) => team.id === id);
      if (!team) return "Unknown/Empty team";
      if (team.name === "")
        return team.members.find((member) => member.id !== loggedInUser?.id)
          ?.username;
      return team.name;
    };

    function findReceivers(id: number, senderId: number) {
      const team = localTeams.find((team) => team.id === id);
      const receivers = team?.members.filter(
        (member) => member.id !== senderId
      );
      return receivers;
    }

    const messageSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (
            findReceivers(payload.new.team_id, payload.new.sender_id)?.map(
              (receiver) => {
                receiver.id === loggedInUser?.id &&
                  toast.success(
                    `New message from "${findTeamNameById(
                      payload.new.team_id,
                      payload.new.sender_id
                    )}"`
                  );
                return null;
              }
            )
          )
            dispatch(setIsDeleteTeam(false));
          dispatch(setTeamWithNewMessage(payload.new));
          loadTeams();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          loadTeams();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          loadTeams();
        }
      )
      .subscribe();

    const userSubscription = supabase
      .channel("users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        (payload) => {
          try {
            loadUsers();
            loadTeams();
          } catch (error) {
            console.error("Error updating users or teams", error);
          }
        }
      )
      .subscribe();

    const teamsSubscription = supabase
      .channel("teams")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "teams" },
        loadTeams
      )
      .subscribe();

    const teamsMembersSubscription = supabase
      .channel("teams_members")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "teams_members" },
        loadTeams
      )
      .subscribe();
  }, [dispatch, loadTeams, loadUsers, localTeams, loggedInUser]);

  if (!loggedInUser) {
    redirect("/login");
  }
  return <Empty />;
}
export default App;
