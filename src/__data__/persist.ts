import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType, ProfileInfoEntityProps } from "../constants";

interface InitialStateProps {
  permissions: string[];
  profileInfo: ProfileInfoEntityProps;
  auth: boolean;
  theme: ThemeType;
}

const initialState: InitialStateProps = {
  permissions: [],
  profileInfo: {},
  auth: false,
  theme: "light",
};

/* eslint-disable */
const persistSlice = createSlice({
  name: "persist",
  initialState,
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
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
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
  setTheme,
  logout,
} = persistSlice.actions;

export default persistSlice.reducer;
