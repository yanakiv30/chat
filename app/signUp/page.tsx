"use client";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { useEffect } from "react";

export default function SignUp(incomingUserProp: any) {
  const incomingUser = incomingUserProp.incomingUser;

  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function signWithProvider() {
      dispatch(setLoggedInUser(incomingUser));
      router.push("/dashboard");
    }
    if (incomingUser) {
      signWithProvider();
      
    }
  }, [incomingUser, dispatch, router]);

  if (loggedInUser) return null;
  if (incomingUser) return null;
}
