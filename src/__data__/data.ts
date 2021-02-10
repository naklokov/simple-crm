import { createSlice } from "@reduxjs/toolkit";

const dataSlide = createSlice({
  name: "data",
  initialState: {
    dictionaries: {},
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
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  },
});

export const {
  setDictionaries,
  setProfileInfo,
  setClients,
} = dataSlide.actions;

export default dataSlide.reducer;
