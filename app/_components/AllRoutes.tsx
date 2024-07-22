"use client"

import { Route, Routes } from "react-router-dom";
import CheckboxList from "./pages/CheckboxList";
import SettingsGroup from "./pages/SettingsGroup";
import SettingsGroup2 from "./pages/SettingsGroup2";
import GroupMessages from "./pages/GroupMessages";
import Empty from "./pages/Empty";
import SignUp from "./pages/SignUp";
export default function AllRoutes() {
  return (
    <Routes>      
      <Route path="/" element={<Empty />} />  
      <Route path="/signUp" element={<SignUp />} />    
      <Route path="/groups/:groupId" element={<GroupMessages />} />
      <Route path="/groups/createGroups" element={<CheckboxList />} />
      <Route path="/settingsGroup/:groupId" element={<SettingsGroup />} />
      <Route path="/settingsGroup2/:groupId" element={<SettingsGroup2 />} />
      <Route path="/messages/:groupId" element={<GroupMessages />} />
    </Routes>
  );
}
