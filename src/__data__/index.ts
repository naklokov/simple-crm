import persistReducer from "./persist";
import appReducer from "./app";
import dataReducer from "./data";

export { setPermissions, setAuth } from "./persist";

export { setLoading, setTableLoading, setError, updateForm } from "./app";
export { setClients, setDictionaries, setProfileInfo } from "./data";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
  data: dataReducer,
};
