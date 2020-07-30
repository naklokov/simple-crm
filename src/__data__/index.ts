import persistReducer from "./persist";

export {
  setLoading,
  setPermissions,
  setMenuCollapsed,
  setProfileInfo,
} from "./persist";

export const reducers = {
  persist: persistReducer,
};
