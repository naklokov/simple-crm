import { createSlice } from "@reduxjs/toolkit";

const persistSlice = createSlice({
  name: "persist",
  initialState: {
    permissions: [],
    loading: false,
    menuCollapsed: false,
    profileInfo: {},
  },
  reducers: {
    setPermissions(state, action) {
      state.permissions = action.payload.permissions;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setMenuCollapsed(state, action) {
      state.menuCollapsed = action.payload;
    },
    setProfileInfo(state, action) {
      state.profileInfo = action.payload;
    },
  },
});

export const {
  setPermissions,
  setLoading,
  setMenuCollapsed,
  setProfileInfo,
} = persistSlice.actions;

export default persistSlice.reducer;
