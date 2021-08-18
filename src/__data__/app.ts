import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../constants";

type DictionariesType = { [key: string]: any[] };

interface InitialStateProps {
  dictionaries: DictionariesType;
  tableLoading: boolean;
  error: object;
  theme: ThemeType;
}

interface DictionaryProps {
  name: string;
  data?: any[];
}

const initialState: InitialStateProps = {
  dictionaries: {},
  tableLoading: false,
  error: {},
  theme: "light",
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
    setTableLoading(state, action: PayloadAction<boolean>) {
      state.tableLoading = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
  },
});

export const {
  setDictionaries,
  setTableLoading,
  setError,
  setTheme,
} = appSlide.actions;

export default appSlide.reducer;
