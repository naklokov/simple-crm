import { ClientEntityProps } from "../constants";

export interface PersistState {
  permissions: string[];
  menuCollapsed: boolean;
  profileInfo: ProfileInfoProps;
  auth: boolean;
}

export interface ErrorAppState {
  statusCode?: number;
  errorCode?: string;
  errorDescription?: string;
  errorMessage?: string;
}

export interface AppState {
  tableLoading: boolean;
  loading: boolean;
  error: ErrorAppState;
  dictionaries: object;
}

export interface State {
  persist: PersistState;
  app: AppState;
  clients?: ClientEntityProps[];
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
