import persistReducer from "./persist";
import appReducer from "./app";
import clientsReducer from "./clients";

export {
  setPermissions,
  setMenuCollapsed,
  setProfileInfo,
  setAuth,
} from "./persist";

export { setError, setLoading, setTableLoading, setDictionaries } from "./app";

export { setClients } from "./clients";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
  clients: clientsReducer,
};
