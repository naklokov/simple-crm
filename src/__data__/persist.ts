import { createSlice } from "@reduxjs/toolkit";

const persistSlice = createSlice({
  name: "persist",
  initialState: {
    error: {},
    permissions: [],
    menuCollapsed: false,
    profileInfo: {},
    auth: false,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setPermissions(state, action) {
      state.permissions = action.payload;
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
  setError,
} = persistSlice.actions;

export default persistSlice.reducer;
