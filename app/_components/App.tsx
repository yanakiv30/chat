"use client";

import { useEffect } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/store/store";
import { setUsers } from "@/store/userSlice";

import { redirect } from "next/navigation";
import Empty from "./Empty";

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
    redirect("/");
  }
  return <Empty />;
}
export default App;
