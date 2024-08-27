import { Message } from "../../store/groupSlice";
import { getHourDayDate } from "../utils/messageUtils";
import { supabase } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("username,id,avatar,status,created_at"); 
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
  return data;
}

export async function getTeams(loggedInUserId: number) {
  const teamsIds = await getTeamsIds();
  const { data: teamsData, error } = await supabase
    .from("teams")
    .select("*")
    .in("id", teamsIds);

  if (error) {
    console.error(error);
    throw new Error("Teams could not be loaded");
  }

  const membersInTeams = await getMembersInTeams();
  const messagesInTeams = await getMessagesInTeams();
  const users = await getUsers();

  const teamsWithMembers = teamsData.map((team) => ({
    ...team,
    members: membersInTeams
      .filter((tm) => tm.team_id === team.id)
      .map((tm) => users.find((user) => user.id === tm.user_id)!),
    messages: messagesInTeams
      .filter((row) => row.team_id === team.id)
      .map((row) => {
        const message: Message = {
          id: row.id!,
          senderId: row.sender_id!,
          content: row.message!,
          image_path: row.image_path!, // Include image_path here
          ...getHourDayDate(new Date(row.created_at!)),
        };
        return message;
      }),
  }));

  return teamsWithMembers;

  async function getMessagesInTeams() {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      throw new Error("Team Messages could not be loaded");
    }
    return data;
  }

  async function getMembersInTeams() {
    const { data, error } = await supabase.from("teams_members").select();
    if (error) {
      console.error(error);
      throw new Error("Team Members could not be loaded");
    }
    return data;
  }

  async function getTeamsIds() {
    const { data, error } = await supabase
      .from("teams_members")
      .select("team_id")
      .eq("user_id", loggedInUserId);
    if (error) {
      console.error(error);
      throw new Error("teams_members could not be loaded");
    }
    const teamsIds = data.map((x) => x.team_id);

    return teamsIds;
  }
}

export async function getMessages() {
  const { data, error } = await supabase.from("messages").select("*");
  if (error) {
    throw new Error("Messages could not be loaded");
  }
  return data;
}
