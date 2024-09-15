import { createSlice } from "@reduxjs/toolkit";

export type User = { id: number; username: string; avatar: string };

const initialState = {
  isRegister: false,
  isLoading: false,
  isEditingMessage: false,
  editedMessageId: -1,
  editedMessageContent: "",
  users: [] as User[],
  loggedInUser: null as User | null,
  // messages: [] as Message[],
  searchQuery: "",
  searchMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setEditedMessageContent(state, action) {
      state.editedMessageContent = action.payload;
    },
    setEditedMessageId(state, action) {
      state.editedMessageId = action.payload;
    },
    setIsEditingMessage(state, action) {
      state.isEditingMessage = action.payload;
    },
    setIsRegister(state, action) {
      state.isRegister = action.payload;
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setUsers(state, action) {
      state.users = [...action.payload];
    },
    addUser(state, action) {
      state.users = [...state.users, action.payload];
    },
    // setMessages(state, action) {
    //   state.messages = [...action.payload];
    // },
    // addMessage(state, action) {
    //   state.messages = [...state.messages, action.payload];
    // },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchMessage(state, action) {
      state.searchMessage = action.payload;
    },
  },
});
export const {
  setLoggedInUser,
  setUsers,
  addUser,
  setSearchQuery,
  setSearchMessage,
  setIsRegister,
  setIsLoading,
  setIsEditingMessage,
  setEditedMessageId,
  setEditedMessageContent,
} = userSlice.actions;
export default userSlice.reducer;
