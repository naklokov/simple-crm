import persistReducer from "./persist";
import appReducer from "./app";

export { setPermissions, setAuth, setProfileInfo, logout } from "./persist";

export {
  setDictionaries,
  setLoading,
  setTableLoading,
  setFormLoading,
  setError,
  updateForm,
} from "./app";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
};
