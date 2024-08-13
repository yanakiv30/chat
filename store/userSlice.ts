import { createSlice } from "@reduxjs/toolkit";

export type User = { id: number; username: string; avatar: string };

const initialState = {
  isRegister: false,
  isLoading: false,
  isEdit: false,
  messageId: -1,
  mesContent: "",
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
    setMesContent(state, action) {
      state.mesContent = action.payload;
    },
    setMessageId(state, action) {
      state.messageId = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
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
  setIsEdit,
  setMessageId,
  setMesContent,
} = userSlice.actions;
export default userSlice.reducer;
