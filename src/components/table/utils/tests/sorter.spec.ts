import { ColumnProps } from "../../../../constants";
import {
  getFieldSortOrder,
  getSortedParams,
  getDefaultSortBy,
} from "../sorter";

test("getSortOrder", () => {
  const sortByDesc = "id:desc";
  const sortByAsc = "id:asc";
  const sortByUnknown = "id:lol";

  expect(getFieldSortOrder(sortByAsc)).toEqual({ id: "ascend" });
  expect(getFieldSortOrder(sortByDesc)).toEqual({ id: "descend" });
  expect(getFieldSortOrder(sortByUnknown)).toEqual({ id: "ascend" });
});

test("getSortedParams without inversion", () => {
  const field = "name";
  const columns = [] as ColumnProps[];

  expect(getSortedParams({ field, order: "ascend" }, columns)).toBe("name:asc");
  expect(getSortedParams({ field, order: "descend" }, columns)).toBe(
    "name:desc"
  );
  expect(getSortedParams({ field }, columns)).toBe("");
});

test("getSortedParams with inversion", () => {
  const field = "id";
  const columns = [
    {
      columnCode: "id",
      sortInverse: true,
      columnName: "Идентификатор",
      columnType: "number",
    },
  ] as ColumnProps[];

  expect(getSortedParams({ field, order: "ascend" }, columns)).toBe("id:desc");
  expect(getSortedParams({ field, order: "descend" }, columns)).toBe("id:asc");
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
