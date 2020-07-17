export interface PersistState {
  auth: boolean;
  permissions: string[];
  loading: boolean;
}

export interface State {
  persist: PersistState;
}
