import persistReducer from "./persist";
import appReducer from "./app";

export {
  setPermissions,
  setMenuCollapsed,
  setProfileInfo,
  setAuth,
} from "./persist";

export { setError, setLoading, setTableLoading } from "./app";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
};
