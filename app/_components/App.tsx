"use client";

import { useEffect } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/store/store";
import { setLoggedInUser, setUsers } from "@/store/userSlice";

import { useRouter } from "next/navigation";
import Empty from "./Empty";

function App(incomingUserProp: any) {
  
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

  return <Empty />;
}
export default App;
