import { createSlice } from "@reduxjs/toolkit";

const persistSlice = createSlice({
  name: "persist",
  initialState: {
    permissions: [],
    loading: false,
    menuCollapsed: false,
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
  },
});

export const {
  setPermissions,
  setLoading,
  setMenuCollapsed,
} = persistSlice.actions;

export default persistSlice.reducer;
