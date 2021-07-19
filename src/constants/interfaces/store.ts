import { ProfileInfoEntityProps } from "./entities";

export interface PersistState {
  permissions: string[];
  auth: boolean;
  profileInfo: ProfileInfoEntityProps;
}

export interface AppState {
  dictionaries: object;
  error: ErrorAppState;
  tableLoading: boolean;
}

export interface MenuSubDrawerState {
  id: string;
  title: string;
  width?: number;
}

export interface FormState {
  formLoading: { [key: string]: boolean };
  forms: { [key: string]: any };
}

export interface State {
  persist: PersistState;
  app: AppState;
  menuSubDrawer: MenuSubDrawerState;
  form: FormState;
}

export interface ErrorAppState {
  statusCode?: number;
  errorCode?: string;
  errorDescription?: string;
  errorMessage?: string;
}

export interface UpdateFormProps {
  name: string;
  data: any;
}
