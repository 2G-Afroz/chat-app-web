import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getMessagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMessagesSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    getMessagesFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetMessage: (state) => {
      state.messages = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFail,
  resetMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
