import { createSlice } from "@reduxjs/toolkit";

const persistSlice = createSlice({
  name: "persist",
  initialState: {
    permissions: [],
    auth: false,
  },
  reducers: {
    setPermissions(state, action) {
      state.permissions = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
});

export const { setPermissions, setAuth } = persistSlice.actions;

export default persistSlice.reducer;
