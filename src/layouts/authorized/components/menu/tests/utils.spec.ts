import { getSelectedKeyByUrl } from "../utils";
import { urls } from "../../../../../constants";

test("getSelectedKeyByUrl with url", () => {
  const location = {
    pathname: urls.clients.path,
  };
  expect(getSelectedKeyByUrl(location)).toBe("clients");
});

test("getSelectedKeyByUrl without url", () => {
  const location = {
    pathname: "",
  };
  expect(getSelectedKeyByUrl(location)).toBe("");
});
