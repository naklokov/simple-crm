import { createSlice } from "@reduxjs/toolkit";

const appSlide = createSlice({
  name: "app",
  initialState: {
    loading: false,
    tableLoading: false,
    dictionaries: {},
    error: {},
    menuCollapsed: false,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setMenuCollapsed(state, action) {
      state.menuCollapsed = action.payload;
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
  setTableLoading,
  setDictionaries,
  setMenuCollapsed,
  setError,
} = appSlide.actions;

export default appSlide.reducer;
