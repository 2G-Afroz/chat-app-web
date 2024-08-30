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
	},
});

export const { getMessagesStart, getMessagesSuccess, getMessagesFail } = messageSlice.actions;

export default messageSlice.reducer;