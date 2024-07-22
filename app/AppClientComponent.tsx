'use client'

import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import { setLoggedInUser, setUsers } from "@/store/userSlice";
import { setTeams } from "@/store/groupSlice";
//import Login from "../login/page";
import SignUp from "./signUp/page";
import ChatMembersList from "./_components/ChatMembersList";
import AllRoutes from "./_components/AllRoutes";
import Spinner from "./_components/Spinner";
import Login from "./login/page";


function App({ serverData }: {
  serverData: any;
}): JSX.Element {
  const dispatch = useDispatch();
  const { loggedInUser, isLoading, isRegister } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (serverData.loggedInUser) {
      dispatch(setLoggedInUser(serverData.loggedInUser));
      dispatch(setUsers(serverData.users));
      dispatch(setTeams(serverData.teams));
    }
  }, [dispatch, serverData]);

  return (
    <Router>
      <div className="app-container" style={{ position: "relative" }}>
        {isLoading && <Spinner />}
        {loggedInUser ? (
          <div className="main-container">
            <ChatMembersList />
            <AllRoutes />            
          </div>
        ) : (
          <div className="background-login">
            {!isRegister ? <Login /> : <SignUp />}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
