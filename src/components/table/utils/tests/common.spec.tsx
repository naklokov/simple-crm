import { ColumnProps } from "../../../../constants";
import { replaceLikeChars, checkColumnActionType } from "../common";

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
