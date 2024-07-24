"use client"

import { useCallback, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../App.css";

import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { setIsDeleteTeam, setTeams, setTeamWithNewMessage } from "@/store/groupSlice";
import { useAppSelector } from "@/store/store";
import { setUsers } from "@/store/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { getTeams, getUsers } from "../_services/apiGroups";
import { supabase } from "../_services/supabase";
import AllRoutes from "./AllRoutes";
import ChatMembersList from "./ChatMembersList";
import Spinner from "./Spinner";
import Empty from "./Empty";


function App() {
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
  let { isLoading ,isRegister} = useAppSelector((store) => store.user);
  const loadStateFromBackend = useCallback(() => {
    if (!loggedInUser) return;

    getUsers()
      .then((data) => dispatch(setUsers(data)))
      .catch((error) => console.error("Error fetching users:", error));

    getTeams(+loggedInUser.id)
      .then((data) => dispatch(setTeams(data)))
      .catch((error) => console.error("Error fetching teams", error));
  }, [dispatch, loggedInUser]);

  useEffect(loadStateFromBackend, [loadStateFromBackend]);

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
      console.log("receivers = ", receivers);
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
          loadStateFromBackend();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          loadStateFromBackend();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          loadStateFromBackend();
        }
      )
      .subscribe();

    const userSubscription = supabase
      .channel("users")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "users" },
        loadStateFromBackend
      )
      .subscribe();

    const teamsSubscription = supabase
      .channel("teams")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "teams" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "teams" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "teams" },
        loadStateFromBackend
      )
      .subscribe();

    const teamsMembersSubscription = supabase
      .channel("teams_members")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "teams_members" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "teams_members" },
        loadStateFromBackend
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "teams_members" },
        loadStateFromBackend
      )
      .subscribe();
  }, [loadStateFromBackend, localTeams, loggedInUser, dispatch]);

  return (
    <Router>
      <div className="app-container" style={{ position: "relative" }}>
        {isLoading && <Spinner />}  
        {loggedInUser ? 
        <div className="main-container">            
            <ChatMembersList />
            <AllRoutes />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div> :<Empty/> }

                
      </div>
    </Router>
  );
}
export default App;
