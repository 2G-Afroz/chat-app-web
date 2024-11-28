import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  chats: null,
  currentChat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getChatsSuccess: (state, action) => {
      state.chats = action.payload;
      state.loading = false;
    },
    getChatsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    resetChat: (state) => {
      (state.chats = null),
        (state.currentChat = null),
        (state.loading = false),
        (state.error = null);
    },
  },
});

export const {
  getChatsStart,
  getChatsSuccess,
  getChatsFail,
  setCurrentChat,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;
