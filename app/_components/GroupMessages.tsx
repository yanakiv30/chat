"use client"


// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import SearchInMessage from "../features/users/SearchInMessage";
// import Avatar from "../features/users/Avatar";

// import { useDispatch } from "react-redux";
// import { useAppSelector } from "../store";

// import SendUserMessage from "../features/users/SendUserMessage";
// import { searchedGroupMessagesFunc } from "../utils/messageUtils";
// import UserMessagesContainer from "../features/users/UserMessageContainer";
// import { setIsLoading } from "../features/users/userSlice";
// import supabase from "../services/supabase";
// import EditUserMessage from "../features/users/EditUserMessage";
// import Empty from "./Empty";

// export default function GroupMessages() {
//   const { loggedInUser, searchMessage, isEdit } = useAppSelector(
//     (store) => store.user
//   );
//   const { localTeams } = useAppSelector((store) => store.group);
//   const [newGroupMessage, setNewGroupMessage] = useState("");
//   const params = useParams();
//   const groupInListId = +params.groupId!;
//   const dispatch = useDispatch();
//   const team = localTeams.find((x) => x.id === groupInListId);
//   if (!team) return <Empty />;
//   const hiddenName=team.members.find(member=>member.id!==loggedInUser!.id)?.username;

//   async function handleSendGroupMessage() {
//     if (newGroupMessage.trim() !== "") {
//       const newGroupMessageObject = {
//         sender_id: loggedInUser!.id,
//         team_id: groupInListId,
//         type: "text",
//         message: newGroupMessage,
//       };
//       try {
//         const { data, error } = await supabase
//           .from("messages")
//           .insert(newGroupMessageObject)
//           .select();
//         if (error) {
//           throw new Error(error.message);
//         }
//       } catch (error) {
//         const errorMessage = "Error creating Group message: " + error;
//         console.error(errorMessage);
//         alert(errorMessage);
//       } finally {
//        // dispatch(setIsLoading(false));
//       }
//       setNewGroupMessage("");
//     }
//   }

//   async function handleDeleteGroupMessages(idForDelete: string) {
//     dispatch(setIsLoading(true));
//     try {
//       const { error } = await supabase
//         .from("messages")
//         .delete()
//         .eq("id", idForDelete);
//       if (error) {
//         console.error(error);
//         throw new Error("Group Messages could not be deleted");
//       }
//     } catch (error) {
//       console.error("Error deleting group message:", error);
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   }

//   const searchedGroupMessages = searchedGroupMessagesFunc(
//     team.messages || [],
//     searchMessage
//   );

//   return (
//     <div className="profile-wrapper">
//       <div className="user-profile-container">
//         <div className="chat-with">
//           <div>
//             <div style={{ display: "flex", gap: "5px" }}>
//               {team.name!==""&&<Avatar name={team.name || ""} />}
//               <h4>{team.name===""?`Chat with ${hiddenName}`:team.name} </h4>

//             </div>
//             {team.name!==""&&<p style={{ fontSize: "10px", textAlign: "center" }}>
//               members: {team.members.map((user) => user.username).join(",")}
//             </p>}
//           </div>
//           <SearchInMessage />
//           <img
//             style={{ maxWidth: "13%" }}
//             src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"
//             // src="https://cpkaumakwusyxhmexnqr.supabase.co/storage/v1/object/public/messages-images/cabin-001.jpg"
//             alt="some cabin"
//           />
//         </div>
//         <UserMessagesContainer
//           loggedInUser={loggedInUser}
//           userInListId={groupInListId}
//           handleDeleteMessages={handleDeleteGroupMessages}
//           searchedMessages={searchedGroupMessages}
//         />

//         {!isEdit ? (
//           <SendUserMessage
//             newMessage={newGroupMessage}
//             setNewMessage={setNewGroupMessage}
//             handleSendMessage={handleSendGroupMessage}
//           />
//         ) : (
//           <EditUserMessage />
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/store";
import supabase from "../services/supabase";
import SearchInMessage from "../Components/SearchInMessage";
import Avatar from "../Components/Avatar";
import SendUserMessage from "../Components/SendUserMessage";
import { searchedGroupMessagesFunc } from "../utils/messageUtils";
import UserMessagesContainer from "../Components/UserMessageContainer";
import { setIsLoading } from "../../store/userSlice";
import getImageUrl from "../utils/getImageUrl";
import EditUserMessage from "../Components/EditUserMessage";
import Empty from "./Empty";
import { setIsDeleteTeam } from "../../store/groupSlice";

export default function GroupMessages() {
  const { loggedInUser, searchMessage, isEdit } = useAppSelector(
    (store) => store.user
  );
  const { localTeams } = useAppSelector((store) => store.group);
  const [newGroupMessage, setNewGroupMessage] = useState("");
  const params = useParams();
  const groupInListId = +params.groupId!;
  const dispatch = useDispatch();
  const team = localTeams.find((x) => x.id === groupInListId);
  if (!team) return <Empty />;
  const hiddenName = team.members.find(
    (member) => member.id !== loggedInUser!.id
  )?.username;

  async function handleSendGroupMessage(message: string, imagePath?: string) {
    if (message.trim() !== "" || imagePath) {
      const newGroupMessageObject = {
        sender_id: loggedInUser!.id,
        team_id: groupInListId,
        type: imagePath ? "image" : "text",
        message: message,
        image_path: imagePath || null,
      };
      try {
        const { data, error } = await supabase
          .from("messages")
          .insert(newGroupMessageObject)
          .select();
        if (error) {
          throw new Error(error.message);
        }
      } catch (error) {
        const errorMessage = "Error creating Group message: " + error;
        console.error(errorMessage);
        alert(errorMessage);
      } finally {
        // dispatch(setIsLoading(false));
      }
      setNewGroupMessage("");
    }
  }

  async function handleDeleteGroupMessages(idForDelete: string) {
    dispatch(setIsLoading(true));
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", idForDelete);
      if (error) {
        console.error(error);
        throw new Error("Group Messages could not be deleted");
      }
    } catch (error) {
      console.error("Error deleting group message:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  const searchedGroupMessages = searchedGroupMessagesFunc(
    team.messages || [],
    searchMessage
  );

  return (
    <div className="profile-wrapper">
      <div className="user-profile-container">
        <div className="chat-with">
          <div>
            <div style={{ display: "flex", gap: "5px" }}>
              {team.name !== "" && <Avatar name={team.name || ""} />}
              <h4>
                {team.name === "" ? `Chat with ${hiddenName}` : team.name}{" "}
              </h4>
            </div>
            {team.name !== "" && (
              <p style={{ fontSize: "10px", textAlign: "center" }}>
                members: {team.members.map((user) => user.username).join(",")}
              </p>
            )}
          </div>
          <SearchInMessage />
          <img
            style={{ maxWidth: "13%" }}
            src="https://img.freepik.com/premium-photo/two-cheerful-young-girls-using-smartphone-while-sitting-cafe-outdoors_650366-3065.jpg?w=900"
            alt="some cabin"
          />
        </div>
        <UserMessagesContainer
          loggedInUser={loggedInUser}
          userInListId={groupInListId}
          handleDeleteMessages={handleDeleteGroupMessages}
          searchedMessages={searchedGroupMessages}
        />

        {!isEdit ? (
          <SendUserMessage
            newMessage={newGroupMessage}
            setNewMessage={setNewGroupMessage}
            handleSendMessage={handleSendGroupMessage}
          />
        ) : (
          <EditUserMessage />
        )}
      </div>
    </div>
  );
}
