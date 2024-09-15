"use client";

import { setLoggedInUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

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
