import { createSlice } from "@reduxjs/toolkit";

const appSlide = createSlice({
  name: "app",
  initialState: {
    loading: false,
    tableLoading: false,
    dictionaries: {},
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTableLoading(state, action) {
      state.tableLoading = action.payload;
    },
    setDictionaries(state, action) {
      state.dictionaries = Object.assign(state.dictionaries, action.payload);
    },
  },
});

export const {
  setLoading,
  setTableLoading,
  setDictionaries,
} = appSlide.actions;

export default appSlide.reducer;
