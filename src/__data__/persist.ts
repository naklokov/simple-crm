import { createSlice } from "@reduxjs/toolkit";

const persistSlice = createSlice({
  name: "persist",
  initialState: {
    auth: false,
    permissions: [],
    loading: false,
  },
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setPermissions(state, action) {
      state.permissions = action.payload.permissions;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, setPermissions, setLoading } = persistSlice.actions;

export default persistSlice.reducer;
