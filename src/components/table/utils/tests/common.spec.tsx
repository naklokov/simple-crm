import { renderHook, act } from "@testing-library/react-hooks";
import { ColumnProps } from "../../../../constants";
import { useFetchDictionaries } from "../common";
import * as reactRedux from "react-redux";
import * as fetches from "../fetch";

const columns: ColumnProps[] = [
  {
    columnCode: "title",
    columnName: "Заголовок",
    columnType: "string",
  },
  {
    columnCode: "profile",
    columnName: "Значение профиля из справочника",
    columnType: "dictionary",
  },
  {
    columnCode: "cards",
    columnName: "Значение карточек из справочника",
    columnType: "dictionary",
  },
  {
    columnCode: "books",
    columnName: "Значение книг из справочника",
    columnType: "dictionary",
  },
];

const links = {
  profile: {
    href: "/profiles",
  },
  cards: {
    href: "/cards",
  },
};

test("useFetchDictionaries", () => {
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, "useDispatch").mockReturnValue(dispatch);
  const fetchDictionarySpy = jest.spyOn(fetches, "fetchDictionary");

  renderHook(() => useFetchDictionaries(columns, links));

  expect(fetchDictionarySpy).toHaveBeenCalledTimes(2);

  expect(fetchDictionarySpy).toHaveBeenNthCalledWith(
    1,
    "/profiles",
    "profile",
    dispatch
  );
  expect(fetchDictionarySpy).toHaveBeenNthCalledWith(
    2,
    "/cards",
    "cards",
    dispatch
  );
});
