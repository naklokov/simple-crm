import find from "lodash/find";
import { MENU_ITEMS } from "../../../../constants/layouts";

export const getSelectedKeyByUrl = (location: any) => {
  const url = location?.pathname ?? "";
  const selectedItem = find(MENU_ITEMS, { url });
  return selectedItem?.id ?? "";
};
