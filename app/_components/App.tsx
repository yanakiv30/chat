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
import { fetchUsersClient } from "@/apiUtils/apiUsersClient";
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
   return fetchTeams()
      .then((data) => dispatch(setTeams(data)))
      .catch((error) => console.error("Error fetching teams", error));
  }, [dispatch, loggedInUser]);

  const loadUsers = useCallback(() => {
    return fetchUsersClient()
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
   
    let pollingRequestFinish= true;
       const interval= setInterval(async()=>{
          if(!pollingRequestFinish) return;
          console.log("polling");
          pollingRequestFinish = false;
          await loadUsers();
          await loadTeams();
          pollingRequestFinish = true;
        },4000)
    
    return () => {
      
      clearInterval(interval);
    };
  }, [loadTeams, loadUsers]);

  if (!loggedInUser) {
    redirect("/login");
  }
  return <Empty />;
}
export default App;
