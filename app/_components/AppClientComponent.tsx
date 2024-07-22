'use client'

import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import { setLoggedInUser, setUsers } from "@/store/userSlice";
import { setTeams } from "@/store/groupSlice";
import Spinner from "./Spinner";
import ChatMembersList from "./ChatMembersList";
import AllRoutes from "./AllRoutes";
import Login from "../login/page";
import SignUp from "../signUp/page";
// import ChatMembersList from "./pages/ChatMembersList";
// import AllRoutes from "./AllRoutes";
// import Spinner from "./Components/Spinner";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

function App({ serverData}) {
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
