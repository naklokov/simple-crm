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
  formLoading: boolean;
  loading: boolean;
  forms: any;
}

export interface State {
  persist: PersistState;
  app: AppState;
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
