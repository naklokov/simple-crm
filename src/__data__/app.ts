import { createSlice } from "@reduxjs/toolkit";

const appSlide = createSlice({
  name: "app",
  initialState: {
    loading: false,
    tableLoading: false,
    error: {},
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
  },
});

export const { setLoading, setTableLoading, setError } = appSlide.actions;

export default appSlide.reducer;
