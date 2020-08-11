import { createSlice } from "@reduxjs/toolkit";

const persistSlice = createSlice({
  name: "persist",
  initialState: {
    permissions: [],
    menuCollapsed: false,
    profileInfo: {},
    auth: false,
  },
  reducers: {
    setPermissions(state, action) {
      state.permissions = action.payload.permissions;
    },
    setMenuCollapsed(state, action) {
      state.menuCollapsed = action.payload;
    },
    setProfileInfo(state, action) {
      state.profileInfo = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const {
  setPermissions,
  setMenuCollapsed,
  setProfileInfo,
  setAuth,
} = persistSlice.actions;

export default persistSlice.reducer;
