import { renderHook, act } from "@testing-library/react-hooks";
import * as reactRouter from "react-router-dom";
import { ColumnProps } from "../../../../constants";
import {
  getDateBetweenRsql,
  getEqualRsql,
  getLikeRsql,
  getRsqlParams,
} from "../../../../utils";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../../constants";

import {
  getFilterColumnRsqlQuery,
  getFetchDataSourceQuery,
  getFilterAllRsqlQuery,
  getInitialQueries,
  getSearchedColumnsFromFilters,
  useTableServerPagingParams,
} from "../server-pagination-helper";

const column: ColumnProps = {
  columnName: "Колонка",
  columnCode: "someColumn",
  columnType: "date",
  columnDescription: "Описание колонки",
  sorter: true,
  columnActions: [],
};

test("getFilterColumnRsqlQuery date", () => {
  const searched = "поиск";
  expect(getFilterColumnRsqlQuery(searched, column)).toBe(
    getRsqlParams([
      getDateBetweenRsql({ searched, fieldCode: column.columnCode }),
    ])
  );
});
test("getFilterColumnRsqlQuery dictionary or entity", () => {
  const searched = "поиск";
  const dictColumn: ColumnProps = {
    ...column,
    columnType: "dictionary",
  };
  expect(getFilterColumnRsqlQuery(searched, dictColumn)).toBe(
    getRsqlParams([getEqualRsql(dictColumn.columnCode, searched)])
  );
});
test("getFilterColumnRsqlQuery text", () => {
  const searched = "поиск";
  const textColumn: ColumnProps = {
    ...column,
    columnType: "string",
  };

  expect(getFilterColumnRsqlQuery(searched, textColumn)).toBe(
    getRsqlParams([getLikeRsql([textColumn.columnCode], searched)])
  );
});

test("getFilterAllRsqlQuery", () => {
  const searched = "test";
  const searchedKeys = ["id", "name"];

  expect(getFilterAllRsqlQuery(searched, searchedKeys)).toBe(
    'entityData=JLIKE=(id,name,"test")'
  );
});

test("getFetchDataSourceQuery", () => {
  const filters = {
    k1: "user==123",
    k2: 'entityData=JDATEBETWEEN=("2011-12-01T12:04:11")',
    all: "dasda",
  };

  const initialQueries = ["one", "two"];

  expect(getFetchDataSourceQuery(filters, initialQueries)).toBe(
    'user==123;entityData=JDATEBETWEEN=("2011-12-01T12:04:11");dasda;one;two'
  );
});

test("getFetchDataSourceQuery some filter empty", () => {
  const filters = {
    k1: "user==123",
    k2: "",
    all: "dasda",
  };

  const initialQueries = ["one", "two"];

  expect(getFetchDataSourceQuery(filters, initialQueries)).toBe(
    "user==123;dasda;one;two"
  );
});

test("getFetchDataSourceQuery some initialQueries empty", () => {
  const filters = {
    k1: "user==123",
    all: "dasda",
  };

  const initialQueries = ["one", ""];

  expect(getFetchDataSourceQuery(filters, initialQueries)).toBe(
    "user==123;dasda;one"
  );
});

test("getFetchDataSourceQuery initialQueries empty", () => {
  const filters = {
    k1: "user==123",
    all: "dasda",
  };

  const initialQueries: string[] = [];

  expect(getFetchDataSourceQuery(filters, initialQueries)).toBe(
    "user==123;dasda"
  );
});

test("getFetchDataSourceQuery filters empty", () => {
  const filters = {};

  const initialQueries = ["one", "two"];

  expect(getFetchDataSourceQuery(filters, initialQueries)).toBe("one;two");
});

test("getInitialQueries", () => {
  const initialSearch = "?query=one;two&&test=1";

  expect(getInitialQueries(initialSearch)).toEqual(["one", "two"]);
});

test("getInitialQueries without ?", () => {
  const initialSearch = "query=one;two&&test=1";

  expect(getInitialQueries(initialSearch)).toEqual(["one", "two"]);
});

test("getInitialQueries with empty query", () => {
  const initialSearch = "?query=&&test=1";

  expect(getInitialQueries(initialSearch)).toEqual([]);
});

test("getInitialQueries without query", () => {
  const initialSearch = "?test=1";

  expect(getInitialQueries(initialSearch)).toEqual([]);
});

test("getSearchedColumnsFromFilters", () => {
  const filters = {
    k1: "user==123",
    k2: 'entityData=JDATEBETWEEN=("2011-12-01T12:04:11")',
  };

  expect(getSearchedColumnsFromFilters(filters)).toEqual({
    k1: "123",
    k2: "2011-12-01T12:04:11",
  });
});

test("getSearchedColumnsFromFilters with empty key", () => {
  const filters = {
    k1: "",
    k2: 'entityData=JDATEBETWEEN=("2011-12-01T12:04:11")',
  };

  expect(getSearchedColumnsFromFilters(filters)).toEqual({
    k2: "2011-12-01T12:04:11",
  });
});

test("getSearchedColumnsFromFilters with empty key", () => {
  expect(getSearchedColumnsFromFilters({})).toEqual({});
});

test("useTableServerPagingParams set initial params", () => {
  const pushSpy = jest.fn();
  const replaceSpy = jest.fn();

  const historyMock: any = {
    location: {
      search: "",
    },
    push: pushSpy,
    replace: replaceSpy,
  };

  jest.spyOn(reactRouter, "useHistory").mockReturnValue(historyMock);
  const { result } = renderHook(() => useTableServerPagingParams());

  expect(result.current.page).toBe(DEFAULT_PAGE_NUMBER);
  expect(result.current.pageSize).toBe(DEFAULT_PAGE_SIZE);
  expect(result.current.sortBy).toBe("");
  expect(result.current.filters).toEqual({});
});

test("useTableServerPagingParams full", () => {
  const pushSpy = jest.fn();
  const replaceSpy = jest.fn();

  const historyMock: any = {
    location: {
      search:
        '?filters={"key":"123"}&page=2&pageSize=7&sortBy=date:asc&another=123',
    },
    push: pushSpy,
    replace: replaceSpy,
  };

  jest.spyOn(reactRouter, "useHistory").mockReturnValue(historyMock);
  const { result } = renderHook(() => useTableServerPagingParams());

  expect(result.current.page).toBe(2);
  expect(result.current.pageSize).toBe(7);
  expect(result.current.sortBy).toBe("date:asc");
  expect(result.current.filters).toEqual({ key: "123" });

  expect(replaceSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy).not.toHaveBeenCalled();

  act(() => {
    result.current.setFilters({ newKey: "321", secondKey: "2" });
  });

  expect(result.current.page).toBe(2);
  expect(result.current.pageSize).toBe(7);
  expect(result.current.sortBy).toBe("date:asc");
  expect(result.current.filters).toEqual({ newKey: "321", secondKey: "2" });

  expect(replaceSpy).toHaveBeenCalledTimes(2);
  expect(pushSpy).not.toHaveBeenCalled();

  act(() => {
    result.current.setPage(5);
    result.current.setPageSize(100);
    result.current.setSortBy("field:desc");
  });

  expect(result.current.page).toBe(5);
  expect(result.current.pageSize).toBe(100);
  expect(result.current.sortBy).toBe("field:desc");
  expect(result.current.filters).toEqual({ newKey: "321", secondKey: "2" });

  expect(replaceSpy).toHaveBeenCalledTimes(3);
  expect(pushSpy).not.toHaveBeenCalled();
});