import persistReducer from "./persist";

export { setAuth, setLoading, setPermissions } from "./persist";

export const reducers = {
  persist: persistReducer,
};
