import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DictionariesType = { [key: string]: any[] };

interface InitialStateProps {
  dictionaries: DictionariesType;
  tableLoading: boolean;
  error: object;
}

interface DictionaryProps {
  name: string;
  data?: any[];
}

const initialState: InitialStateProps = {
  dictionaries: {},
  tableLoading: false,
  error: {},
};

/* eslint-disable */
const appSlide = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDictionaries(state, action: PayloadAction<DictionaryProps>) {
      const { name, data = [] } = action.payload;
      state.dictionaries = { ...state.dictionaries, [name]: data };
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTableLoading(state, action) {
      state.tableLoading = action.payload;
    },
  },
});

export const { setDictionaries, setTableLoading, setError } = appSlide.actions;

export default appSlide.reducer;
