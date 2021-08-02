import { renderHook, act } from "@testing-library/react-hooks";
import * as reactRedux from "react-redux";
import { ColumnProps } from "../../../../constants";
import {
  useFetchDictionaries,
  replaceLikeChars,
  checkColumnActionType,
} from "../common";
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

test("replaceLikeChars with like char", () => {
  const withLikeChars = "%привет%";
  const withoutLikeChars = "строка";

  expect(replaceLikeChars(withLikeChars)).toBe("привет");
  expect(replaceLikeChars(withoutLikeChars)).toBe("строка");
});

test("replaceLikeChars with like char and question mark", () => {
  const withChars = `%при\"вет%`;
  const withoutChars = "строка";

  expect(replaceLikeChars(withChars)).toBe('при"вет');
  expect(replaceLikeChars(withoutChars)).toBe("строка");
});

test("checkColumnActionType", () => {
  const column: ColumnProps = {
    columnCode: "id",
    columnName: "Идентификатор",
    columnType: "string",
    columnActions: [
      {
        actionCode: "e-m-a-i-l",
        actionName: "Почта",
        actionType: "email",
        permissions: [],
      },
    ],
  };

  expect(checkColumnActionType(column, "email")).toBe(true);
  expect(checkColumnActionType(column, "call")).toBe(false);
});
