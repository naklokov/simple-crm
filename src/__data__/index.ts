import persistReducer from "./persist";
import appReducer from "./app";
import clientsReducer from "./clients";

export { setPermissions, setProfileInfo, setAuth } from "./persist";

export {
  setLoading,
  setTableLoading,
  setDictionaries,
  setError,
  setMenuCollapsed,
} from "./app";

export { setClients } from "./clients";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
  clients: clientsReducer,
};
