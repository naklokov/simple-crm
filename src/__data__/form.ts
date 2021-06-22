import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
  formLoading: { [formName: string]: boolean };
  forms: { [formName: string]: object };
}

const initialState: InitialStateProps = {
  formLoading: {},
  forms: {},
};

interface FormUpdateProps {
  name: string;
  values: any;
}

interface FormLoadingProps {
  name: string;
  loading: boolean;
}

/* eslint-disable */
const formSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFormLoading(state, action: PayloadAction<FormLoadingProps>) {
      const { name, loading = false } = action?.payload;
      if (name) {
        state.formLoading = { [name]: loading };
      }
    },
    updateForm(state, action: PayloadAction<FormUpdateProps>) {
      const { name, values = {} } = action.payload;
      state.forms = {
        ...state.forms,
        [name]: values,
      };
    },
  },
});

export const { setFormLoading, updateForm } = formSlice.actions;

export default formSlice.reducer;
