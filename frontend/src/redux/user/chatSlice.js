import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	chats: null,
	loading: false,
	error: null,
};

const chatSlice = createSlice({
	name: 'chat',
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
	},
});

export const { getChatsStart, getChatsSuccess, getChatsFail } = chatSlice.actions;

export default chatSlice.reducer;