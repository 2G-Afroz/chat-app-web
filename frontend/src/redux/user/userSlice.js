import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    registerFail: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
    logoutUser: (state) => {
			state.currentUser = null;
      state.loading = false;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFail,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
