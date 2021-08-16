import * as reactRouter from "react-router-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import { stringify } from "query-string";
import { useTabs, useClientTimeZone } from "../hooks";
import { TabProps } from "../../constants";

const getHistoryMock = (search: string, push: Function, replace: Function) => ({
  location: {
    search,
  },
  push,
  replace,
});

const tabs: TabProps[] = [
  {
    tabCode: "1",
    tabName: "Первая вкладка",
    tabDescription: "",
    type: "table",
    actions: [],
    columns: [],
    _links: {},
  },
  {
    tabCode: "2",
    tabName: "Вторая вкладка",
    tabDescription: "",
    type: "table",
    actions: [],
    columns: [],
    _links: {},
  },
];

test("useTabs with change tab", () => {
  const pushSpy = jest.fn();
  const replaceSpy = jest.fn();
  const search = "";

  const historyMockEmptySearch: any = getHistoryMock(
    search,
    pushSpy,
    replaceSpy
  );
  const useHistorySpy = jest.spyOn(reactRouter, "useHistory");
  useHistorySpy.mockReturnValue(historyMockEmptySearch);
  const { result } = renderHook(() => useTabs(tabs));

  expect(result.current.activeTab).toEqual(tabs[0]);
  expect(pushSpy).not.toHaveBeenCalled();
  expect(replaceSpy).not.toHaveBeenCalled();

  act(() => {
    result.current.onChange("2");
  });

  // вкладка остаётся старой
  expect(result.current.activeTab).toEqual(tabs[0]);

  // вызывается push
  expect(pushSpy).toHaveBeenCalledWith({ search: stringify({ tab: "2" }) });
  expect(replaceSpy).not.toHaveBeenCalled();
});

test("useTabs with pass all args", () => {
  const pushSpy = jest.fn();
  const replaceSpy = jest.fn();
  const search = "";

  const historyMockEmptySearch: any = getHistoryMock(
    search,
    pushSpy,
    replaceSpy
  );
  const useHistorySpy = jest.spyOn(reactRouter, "useHistory");
  useHistorySpy.mockReturnValue(historyMockEmptySearch);
  const { result } = renderHook(() => useTabs(tabs, "replace", "lower"));

  expect(result.current.activeTab).toEqual(tabs[0]);
  expect(pushSpy).not.toHaveBeenCalled();
  expect(replaceSpy).not.toHaveBeenCalled();

  act(() => {
    result.current.onChange("2");
  });

  // вкладка остаётся старой
  expect(result.current.activeTab).toEqual(tabs[0]);

  // вызывается replace
  expect(replaceSpy).toHaveBeenCalledWith({
    search: stringify({ "lower:tab": "2" }),
  });
  expect(pushSpy).not.toHaveBeenCalled();
});

test("useTabs get activeTab from query", () => {
  const pushSpy = jest.fn();
  const replaceSpy = jest.fn();
  const search = "tab=2";

  const historyMockEmptySearch: any = getHistoryMock(
    search,
    pushSpy,
    replaceSpy
  );
  const useHistorySpy = jest.spyOn(reactRouter, "useHistory");
  useHistorySpy.mockReturnValue(historyMockEmptySearch);
  const { result } = renderHook(() => useTabs(tabs));

  expect(result.current.activeTab).toEqual(tabs[1]);
  expect(pushSpy).not.toHaveBeenCalled();
  expect(replaceSpy).not.toHaveBeenCalled();
});
