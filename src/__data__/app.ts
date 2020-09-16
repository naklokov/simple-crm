import { createSlice } from "@reduxjs/toolkit";

const appSlide = createSlice({
  name: "app",
  initialState: {
    error: {},
    loading: false,
    tableLoading: false,
    dictionaries: {},
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
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
  setError,
  setTableLoading,
  setDictionaries,
} = appSlide.actions;

export default appSlide.reducer;
