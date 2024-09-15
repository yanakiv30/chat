import { fetchTeams } from "@/apiUtils/apiTeams";
import { fetchUsersClient } from "@/apiUtils/apiUsersClient";
import {
  setIsDeleteTeam,
  setTeams,
  setTeamWithNewMessage,
  Team,
} from "@/store/groupSlice";
import { useAppSelector } from "@/store/store";
import { setUsers, User } from "@/store/userSlice";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AvailableChats from "./AvailableChats";
import MyChatsList from "./MyChatsList";
import MenuHeader from "./MenuHeader";
import UserAndSearch from "./UserAndSearch";

const queryClient = new QueryClient();

function ChatMembersList() {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser } = useAppSelector((store) => store.user);
  const { localTeams } = useAppSelector((store) => store.group);
  const lastFetchedTeamsRef = useRef<Team[]>(localTeams);
  const previousUsersRef = useRef<User[]>([]);

  const findTeamNameById = useCallback(
    (id: number) => {
      const team = localTeams.find((team) => team.id === id);
      if (!team) return "Unknown/Empty team";
      if (team.name === "")
        return team.members.find((member) => member.id !== loggedInUser?.id)
          ?.username;
      return team.name;
    },
    [localTeams, loggedInUser]
  );

  const findReceivers = useCallback(
    (id: number, senderId: number) => {
      const team = localTeams.find((team) => team.id === id);
      return team?.members.filter((member) => member.id !== senderId);
    },
    [localTeams]
  );

  const checkForNewMessages = useCallback(
    (newTeams: Team[]) => {
      newTeams.forEach((newTeam: Team) => {
        const oldTeam = lastFetchedTeamsRef.current.find(
          (t) => t.id === newTeam.id
        );
        if (oldTeam && newTeam.messages.length > oldTeam.messages.length) {
          const newMessage = newTeam.messages[newTeam.messages.length - 1];
          if (newMessage.senderId !== loggedInUser?.id) {
            const receivers = findReceivers(newTeam.id, newMessage.senderId);
            if (
              receivers?.some((receiver) => receiver.id === loggedInUser?.id)
            ) {
              toast.success(
                `New message from "${findTeamNameById(newTeam.id)}"`
              );
              dispatch(setIsDeleteTeam(false));
              dispatch(
                setTeamWithNewMessage({
                  team_id: newTeam.id,
                  sender_id: newMessage.senderId,
                })
              );
            }
          }
        }
      });
      lastFetchedTeamsRef.current = newTeams;
    },
    [dispatch, findReceivers, findTeamNameById, loggedInUser]
  );

  const memoizedSetTeams = useCallback(
    (newTeams: Team[]) => {
      dispatch(setTeams(newTeams));
    },
    [dispatch]
  );

  const memoizedSetUsers = useCallback(
    (newUsers: User[]) => {
      dispatch(setUsers(newUsers));
    },
    [dispatch]
  );

  useQuery("teams", fetchTeams, {
    enabled: !!loggedInUser,
    refetchInterval: 1000,
    onSuccess: (data) => {
      if (
        JSON.stringify(data) !== JSON.stringify(lastFetchedTeamsRef.current)
      ) {
        memoizedSetTeams(data);
        checkForNewMessages(data);
      }
    },
    onError: (error) => {
      console.error("Error fetching teams", error);
    },
  });

  useQuery("users", fetchUsersClient, {
    enabled: true,
    refetchInterval: 2000,
    onSuccess: (data) => {
      if (JSON.stringify(data) !== JSON.stringify(previousUsersRef.current)) {
        memoizedSetUsers(data);
        previousUsersRef.current = data;
      }
    },
    onError: (error) => console.error("Error fetching users", error),
  });

  return (
    <div className="user-list-container">
      <MenuHeader />
      <br></br>
      <UserAndSearch />
      <br></br>
      <button
        onClick={() => setIsNewChatOpen(!isNewChatOpen)}
        style={{ background: "purple", color: "white" }}
      >
        Available Chats
      </button>
      {isNewChatOpen && <AvailableChats />}
      <br></br>
      <p>My Chats</p>
      <MyChatsList />

      <Image
        src="/cheerful.jpg"
        alt="Two cheerful young girls using smartphone while sitting at cafe outdoors"
        width={900}
        height={600}
        layout="responsive"
      />
    </div>
  );
}
export default function WrappedChatMembersList() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatMembersList />
    </QueryClientProvider>
  );
}
