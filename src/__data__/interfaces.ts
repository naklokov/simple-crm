import { ClientEntityProps, TaskEntityProps } from "../constants";

export interface PersistState {
  permissions: string[];
  auth: boolean;
}

export interface AppState {
  error: ErrorAppState;
  tableLoading: boolean;
  loading: boolean;
}

export interface DataState {
  dictionaries: object;
  clients: ClientEntityProps[];
  tasks: TaskEntityProps[];
  profileInfo: ProfileInfoProps;
}

export interface State {
  persist: PersistState;
  app: AppState;
  data: DataState;
}

export interface ErrorAppState {
  statusCode?: number;
  errorCode?: string;
  errorDescription?: string;
  errorMessage?: string;
}

export interface ProfileInfoProps {
  id?: string;
  aboutMe?: string;
  birthDate?: string;
  businessId?: string;
  creationDate?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  location?: string;
  login?: string;
  parentId?: string;
  position?: string;
  userRoleId?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isLocked?: boolean;
}
