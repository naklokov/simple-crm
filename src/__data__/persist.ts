import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable */
const persistSlice = createSlice({
  name: "persist",
  initialState: {
    permissions: [],
    profileInfo: {},
    auth: false,
  },
  reducers: {
    setProfileInfo(state, action) {
      state.profileInfo = action.payload;
    },
    setPermissions(state, action) {
      state.permissions = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    logout(state) {
      state.auth = false;
      state.permissions = [];
      state.profileInfo = {};
    },
  },
});

export const {
  setPermissions,
  setAuth,
  setProfileInfo,
  logout,
} = persistSlice.actions;

export default persistSlice.reducer;
