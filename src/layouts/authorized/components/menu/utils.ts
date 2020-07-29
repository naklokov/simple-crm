import find from "lodash/find";
import { MENU_ITEMS } from "../../../../constants/layouts";
import { History } from "history";

export const getSelectedKeyByUrl = (history: History) => {
  const url = history?.location?.pathname ?? "";
  const defaultId = MENU_ITEMS[0].id;

  const selectedItem = find(MENU_ITEMS, { url });
  return selectedItem?.id ?? defaultId;
};
