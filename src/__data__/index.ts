import persistReducer from "./persist";
import appReducer from "./app";
import formReducer from "./form";
import menuSubDrawerReducer from "./menu-sub-drawer";

export { setFormLoading, updateForm } from "./form";

export {
  setPermissions,
  setAuth,
  setProfileInfo,
  logout,
  setTheme,
} from "./persist";

export { setDictionaries, setTableLoading, setError } from "./app";

export {
  open as openMenuSubDrawer,
  close as closeMenuSubDrawer,
} from "./menu-sub-drawer";

export const reducers = {
  persist: persistReducer,
  app: appReducer,
  form: formReducer,
  menuSubDrawer: menuSubDrawerReducer,
};
