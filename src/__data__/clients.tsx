import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: [],
  reducers: {
    setClients: (state, action) => action.payload,
  },
});

export const { setClients } = clientsSlice.actions;

export default clientsSlice.reducer;
