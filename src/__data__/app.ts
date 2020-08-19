import { createSlice } from "@reduxjs/toolkit";

const appSlide = createSlice({
  name: "app",
  initialState: {
    error: {},
    loading: false,
    tableLoading: false,
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

export const { setLoading, setError, setTableLoading } = appSlide.actions;

export default appSlide.reducer;
