import { ColumnProps } from "../../../../constants";
import { loadDictionaries } from "../common";
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

test("loadDictionaries", () => {
  const dispatch = jest.fn();
  const fetchDictionarySpy = jest.spyOn(fetches, "fetchDictionary");

  loadDictionaries(columns, links, dispatch);

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
