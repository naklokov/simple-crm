import { createSlice } from "@reduxjs/toolkit";

const dataSlide = createSlice({
  name: "data",
  initialState: {
    dictionaries: {},
    activeTasks: [],
    profileInfo: {},
    clients: [],
  },
  reducers: {
    setDictionaries(state, action) {
      state.dictionaries = Object.assign(state.dictionaries, action.payload);
    },
    setProfileInfo(state, action) {
      state.profileInfo = action.payload;
    },
    setActiveTasks(state, action) {
      state.activeTasks = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const {
  setDictionaries,
  setProfileInfo,
  setActiveTasks,
  setClients,
} = dataSlide.actions;

export default dataSlide.reducer;
