import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable */
const appSlide = createSlice({
  name: "app",
  initialState: {
    loading: false,
    tableLoading: false,
    formLoading: false,
    forms: {},
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
    setFormLoading(state, action) {
      state.formLoading = action.payload;
    },
    updateForm(state, action) {
      state.forms = {
        ...state.forms,
        [action.payload?.name]: action.payload?.data ?? {},
      };
    },
  },
});

export const {
  setLoading,
  setTableLoading,
  setFormLoading,
  setError,
  updateForm,
} = appSlide.actions;

export default appSlide.reducer;
