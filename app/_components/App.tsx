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
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers(initialUsers));
  }, [initialUsers, dispatch]);

  if (!loggedInUser) {
    redirect("/login");
  }
  return <Empty />;
}
export default App;
