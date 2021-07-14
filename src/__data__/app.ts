import { createSlice } from "@reduxjs/toolkit";

/* eslint-disable */
const appSlide = createSlice({
  name: "app",
  initialState: {
    dictionaries: {},
    loading: false,
    tableLoading: false,
    formLoading: false,
    forms: {},
    error: {},
  },
  reducers: {
    setDictionaries(state, action) {
      state.dictionaries = Object.assign(state.dictionaries, action.payload);
    },
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
  setDictionaries,
  setLoading,
  setTableLoading,
  setFormLoading,
  setError,
  updateForm,
} = appSlide.actions;

export default appSlide.reducer;
