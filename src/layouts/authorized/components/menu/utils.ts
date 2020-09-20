import find from "lodash/find";
import { MENU_ITEMS } from "../../../../constants/layouts";
import { History } from "history";

export const getSelectedKeyByUrl = (location: any) => {
  const url = location?.pathname ?? "";
  const selectedItem = find(MENU_ITEMS, { url });
  return selectedItem?.id ?? "";
};
