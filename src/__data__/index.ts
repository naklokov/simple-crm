import persistReducer from "./persist";
import appReducer from "./app";

export {
  setPermissions,
  setMenuCollapsed,
  setProfileInfo,
  setAuth,
} from "./persist";

export { setError, setLoading } from "./app";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
};
