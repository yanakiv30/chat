"use client";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../store/userSlice";
import { useEffect, useState } from "react";

export default function SignUp(incomingUserProp: any) {
  const incomingUser = incomingUserProp.incomingUser;

  const router = useRouter();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function signWithGoogle() {
      dispatch(setLoggedInUser(incomingUser));
      router.push("/dashboard");
    }
    if (incomingUser) signWithGoogle();
  }, [incomingUser, dispatch, router]);

  if (loggedInUser) return null;
  if (incomingUser) return null;
}
