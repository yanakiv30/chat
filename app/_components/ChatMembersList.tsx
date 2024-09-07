import { useCallback, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import LogoLogout from "./LogoLogout";
import IconAndSearch from "./IconAndSearch";
import AccessibleChats from "./AccessibleChats";
import GroupList from "./GroupList";
import { fetchTeams } from "@/apiUtils/apiTeams";
import { fetchUsersClient } from "@/apiUtils/apiUsersClient";
import { setTeams, setIsDeleteTeam, setTeamWithNewMessage, Team } from "@/store/groupSlice";
import { useAppSelector } from "@/store/store";
import { setUsers } from "@/store/userSlice";
import { useDispatch } from "react-redux";

function ChatMembersList() {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
  const lastFetchedTeamsRef = useRef<Team[]>(localTeams);

  const findTeamNameById = useCallback((id: number, senderId: number) => {
    const team = localTeams.find((team) => team.id === id);
    if (!team) return "Unknown/Empty team";
    if (team.name === "")
      return team.members.find((member) => member.id !== loggedInUser?.id)?.username;
    return team.name;
  }, [localTeams, loggedInUser]);

  const findReceivers = useCallback((id: number, senderId: number) => {
    const team = localTeams.find((team) => team.id === id);
    return team?.members.filter((member) => member.id !== senderId);
  }, [localTeams]);

  const loadTeams = useCallback(() => {
    if (!loggedInUser) return Promise.resolve<Team[]>([]);
    return fetchTeams()
      .then((data) => {
        dispatch(setTeams(data));
        return data;
      })
      .catch((error) => {
        console.error("Error fetching teams", error);
        return [];
      });
  }, [dispatch, loggedInUser]);

  const loadUsers = useCallback(() => {
    return fetchUsersClient()
      .then((data) => {
        dispatch(setUsers(data));
      })
      .catch((error) => console.error("Error fetching users", error));
  }, [dispatch]);

  useEffect(() => {
    let pollingRequestFinish = true;
    const interval = setInterval(async () => {
      if (!pollingRequestFinish) return;
      console.log("polling");
      pollingRequestFinish = false;
      await loadUsers();
      const newTeams = await loadTeams();
      
      // Check for new messages
      newTeams.forEach((newTeam: Team) => {
        const oldTeam = lastFetchedTeamsRef.current.find(t => t.id === newTeam.id);
        if (oldTeam && newTeam.messages.length > oldTeam.messages.length) {
          const newMessage = newTeam.messages[newTeam.messages.length - 1];
          // console.log("newTeam",newTeam);
          // console.log("newMessage",newMessage);
          if (newMessage.senderId !== loggedInUser?.id) {
            const receivers = findReceivers(newTeam.id, newMessage.senderId);
            if (receivers?.some(receiver => receiver.id === loggedInUser?.id)) {
              toast.success(`New message from "${findTeamNameById(newTeam.id, newMessage.senderId)}"`);
              dispatch(setIsDeleteTeam(false));
              dispatch(setTeamWithNewMessage({ 
                team_id: newTeam.id,
                sender_id: newMessage.senderId
              }));
            }
          }
        }
      });

      lastFetchedTeamsRef.current = newTeams;
      pollingRequestFinish = true;
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [loadTeams, loadUsers, findTeamNameById, findReceivers, loggedInUser, dispatch]);
  return (
    <div className="user-list-container">
      <LogoLogout />
      <br></br>
      <IconAndSearch />
      <br></br>
      <button
        onClick={() => setIsNewChatOpen(!isNewChatOpen)}
        style={{ background: "purple", color: "white" }}
      >
        Available Chats
      </button>
      {isNewChatOpen && <AccessibleChats />}
      <br></br>
      <p>My Chats</p>
      <GroupList />

      <img
        style={{ maxWidth: "70%" }}
        src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"
        alt="some cabin"
      />
    </div>
  );
}
export default ChatMembersList;
