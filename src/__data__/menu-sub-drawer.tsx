import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuSubDrawerState } from "../constants";

const DEFAULT_WIDTH = 400;

interface InitialStateProps {
  id: string;
  title: string;
  width: number;
}

const initialState: InitialStateProps = {
  id: "",
  title: "",
  width: DEFAULT_WIDTH,
};

/* eslint-disable */
const menuSubDrawerSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    open(state, action: PayloadAction<MenuSubDrawerState>) {
      const { id, title, width = DEFAULT_WIDTH } = action?.payload;

      state.id = id;
      state.title = title;
      state.width = width;
    },
    close(state) {
      state.id = initialState.id;
      state.title = initialState.title;
      state.width = initialState.width;
    },
  },
});

export const { open, close } = menuSubDrawerSlice.actions;

export default menuSubDrawerSlice.reducer;
