import { Message } from "../../store/groupSlice";
import { User } from "../../store/userSlice";

export function leftGroupMessage(
  loggedInUser: User | null,
  groupInListId: number | undefined,
  groups: {
    name: string;
    id: number;
    members: [string];
    admin: string;
  }[]
) {
  return groups
    .filter((group) => group.id === groupInListId)[0]
    .members.includes(loggedInUser!.username);
}

export function leftMessage(
  message: Message,

  userInListId: number | undefined
) {
  return message.senderId === userInListId;
}

export function rightMessage(
  message: Message,
  loggedInUser: User | null,
  userInListId: string | undefined
) {
  return message.senderId === loggedInUser!.id;
}

export function searchedMessageFunc(
  messages: Message[],

  searchMessage: string
) {
  return messages.filter((userMessage) =>
    userMessage.content.includes(searchMessage)
  );
}
export function getHourDayDate(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hourMinDate = `${hours}:${minutes.toString().padStart(2, "0")}`;
  const dayDate = `${date.getDate()}
    .${date.getMonth()}.${date.getFullYear()}`;
  return { hourMinDate, dayDate };
}

export function searchedGroupMessagesFunc(
  groupMessages: Message[],
  searchMessage: string
) {
  return groupMessages.filter((groupMessage) =>
    groupMessage.content.includes(searchMessage)
  );
}
