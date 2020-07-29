import persistReducer from "./persist";

export { setLoading, setPermissions, setMenuCollapsed } from "./persist";

export const reducers = {
  persist: persistReducer,
};
