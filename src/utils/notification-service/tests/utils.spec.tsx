import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as redux from "react-redux";
import {
  showNotification,
  useActiveDateTime,
  useActiveTasks,
  useOverdueTasksTotal,
} from "../utils";
import { notification } from "antd";
import { urls } from "../../../constants";
import { TASKS_ENTITY_STUB, TASKS_PAGING_STUB } from "./stubs";

const mock = new MockAdapter(axios);

jest.useFakeTimers();
jest.mock("moment-timezone", () => () =>
  jest.requireActual("moment")("2020-01-01T00:00:00.000Z")
);

test("showNotification warning", () => {
  const warningSpy = jest.spyOn(notification, "warning");
  const title = "Заголовок";
  const id = "123";
  const content = <div />;

  showNotification({ title, content, id, type: "warning" });
  expect(warningSpy).toHaveBeenCalledWith({
    key: id,
    message: title,
    description: content,
    duration: 0,
    placement: "bottomRight",
  });
});

test("showNotification default", () => {
  const infoSpy = jest.spyOn(notification, "info");
  const title = "Заголовок";
  const content = <div />;
  const icon = <img />;

  showNotification({ title, content, icon });
  expect(infoSpy).toHaveBeenCalledWith({
    key: "1",
    message: title,
    icon,
    description: content,
    duration: 0,
    placement: "bottomRight",
  });
});

test("useOverdueTasksTotal", async () => {
  mock.onGet(urls.tasks.paging).reply(200, TASKS_PAGING_STUB);
  const profileInfo = { id: "123" };
  jest.spyOn(redux, "useSelector").mockReturnValue(profileInfo);
  const { result } = renderHook(() => useOverdueTasksTotal());

  expect(result.current).toBe(0);
  await act(async () => {});
  expect(result.current).toBe(3);
});
test("useActiveDateTime without waiting", () => {
  const { result } = renderHook(() => useActiveDateTime());

  expect(result.current).toBe("2020-01-01T00:00:00.000Z");
  act(() => {
    jest.runAllTimers();
  });

  expect(result.current).toBe("2020-01-01T00:01:00.000Z");
  act(() => {
    jest.runAllTimers();
  });
});

test("useActiveTasks", async () => {
  mock.onGet(urls.tasks.entity).reply(200, TASKS_ENTITY_STUB);
  const profileInfo = { id: "123" };
  jest.spyOn(redux, "useSelector").mockReturnValue(profileInfo);

  const { result } = renderHook(() => useActiveTasks());

  expect(result.current).toEqual([]);
  await act(async () => {});

  expect(result.current).toEqual(TASKS_ENTITY_STUB);
});
