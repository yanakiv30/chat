"use client";

import { useEffect } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/store/store";
import { setLoggedInUser, setUsers } from "@/store/userSlice";

import { redirect, useRouter } from "next/navigation";
import Empty from "./Empty";

// type UserSup = {
//   username: string;
//   id: number;
//   avatar: string;
//   status: string;
//   created_at: string;
// };
// interface AppProps {
//   initialUsers: UserSup[];
// }

//function App({ initialUsers }: AppProps) {
function App(incomingUserProp: any) {

  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  const incomingUser = incomingUserProp.incomingUser;

  const router = useRouter();
 
  useEffect(() => {
    async function signWithProvider() {
      dispatch(setLoggedInUser(incomingUser));
      router.push("/empty"); 
    }
    if (incomingUser) {
      signWithProvider();
      
    }
  }, [incomingUser, dispatch, router]);

  if (loggedInUser) return null;
  if (incomingUser) return null;


  // useEffect(() => {
  //   dispatch(setUsers(initialUsers));
  // }, [initialUsers, dispatch]);

  if (!loggedInUser) {
    redirect("/");
  }
  return <Empty />;
}
export default App;
