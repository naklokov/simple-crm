import { MENU_ITEMS } from "../../../../constants";

export const getSelectedKeyByUrl = (location: any) => {
  const url = location?.pathname ?? "";
  return MENU_ITEMS.filter((item) => item.url === url)?.[0]?.id ?? "";
};
