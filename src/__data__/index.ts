import persistReducer from "./persist";
import appReducer from "./app";
import clientsReducer from "./clients";

export {
  setPermissions,
  setMenuCollapsed,
  setProfileInfo,
  setAuth,
  setError,
} from "./persist";

export { setLoading, setTableLoading, setDictionaries } from "./app";

export { setClients } from "./clients";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
  clients: clientsReducer,
};
