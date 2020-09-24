import { createSlice } from "@reduxjs/toolkit";

const dataSlide = createSlice({
  name: "data",
  initialState: {
    dictionaries: {},
    tasks: [],
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
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const {
  setDictionaries,
  setProfileInfo,
  setTasks,
  setClients,
} = dataSlide.actions;

export default dataSlide.reducer;
