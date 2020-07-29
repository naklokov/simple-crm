import { getSelectedKeyByUrl } from "../utils";

import { MENU_ITEMS } from "../../../../../constants/layouts";

const getHistory = (pathname: string): any => ({
  location: {
    pathname,
  },
});
test("getSelectedKeyByUrl util with exist url", () => {
  let { url, id } = MENU_ITEMS[2];

  expect(getSelectedKeyByUrl(getHistory(url))).toBe(id);
});

test("getSelectedKeyByUrl util with not exist url", () => {
  expect(getSelectedKeyByUrl(getHistory("/lololo"))).toBe(MENU_ITEMS[0].id);
});
