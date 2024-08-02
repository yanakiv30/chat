"use client"

import { Route, Routes } from "react-router-dom";
import Empty from "./Empty";
import GroupMessages from "./GroupMessages";
import CheckboxList from "./CheckboxList";
import SettingsGroup from "./SettingsGroup";
import SettingsGroup2 from "./SettingsGroup";
import SignUp from "../signup/page";

export default function AllRoutes() {
  return (
    <Routes>      
      <Route path="/login" element={<Empty />} />  
      <Route path="/account" element={<Empty />} /> 
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
