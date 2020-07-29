export interface PersistState {
  permissions: string[];
  loading: boolean;
  menuCollapsed: boolean;
}

export interface State {
  persist: PersistState;
}
