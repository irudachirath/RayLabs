// src/reducers/userReducer.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = userSlice.actions;
export default userSlice.reducer;
