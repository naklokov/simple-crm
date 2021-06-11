import { ColumnProps } from "../../../../constants";
import { getSortOrder, getSortedParams, getDefaultSortBy } from "../sorter";

test("getSortOrder", () => {
  const sortByDesc = "id:desc";
  const sortByAsc = "id:asc";
  const sortByUnknown = "id:lol";

  expect(getSortOrder(sortByAsc)).toEqual({ id: "ascend" });
  expect(getSortOrder(sortByDesc)).toEqual({ id: "descend" });
  expect(getSortOrder(sortByUnknown)).toEqual({ id: "ascend" });
});

test("getSortedParams", () => {
  const field = "name";

  expect(getSortedParams({ field, order: "ascend" })).toBe("name:asc");
  expect(getSortedParams({ field, order: "descend" })).toBe("name:desc");
  expect(getSortedParams({ field })).toBe("");
});

test("getDefaultSortBy", () => {
  const defaultSortField = "random";
  const columns: ColumnProps[] = [
    {
      columnCode: "id",
      columnName: "Идентификатор",
      columnType: "number",
    },
    {
      columnCode: "name",
      columnName: "Наименование",
      columnType: "string",
    },
  ];

  expect(getDefaultSortBy(columns)).toBe("id:asc");
  expect(getDefaultSortBy(columns, defaultSortField)).toBe("random:asc");
});
