import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as redux from "react-redux";
import { History } from "history";
import {
  getActiveTasksProps,
  showNotification,
  updateNotificationStatus,
  useActiveDateTime,
  useActiveTasks,
  useOverdueTasksTotal,
} from "../utils";
import { notification } from "antd";
import { NotificationProps, TaskEntityProps, urls } from "../../../constants";
import { TASKS_ENTITY_STUB, TASKS_PAGING_STUB } from "./stubs";
import { NotificationWarning } from "../../../assets/icons";

const mock = new MockAdapter(axios);

jest.useFakeTimers();
jest.mock("moment-timezone", () => () =>
  jest.requireActual("moment")("2020-01-01T00:00:00.000Z")
);

test("showNotification with default props", () => {
  jest.resetAllMocks();
  const notificationOpenSpy = jest.spyOn(notification, "open");
  const title = "Заголовок";
  const content = <div />;
  const icon = (
    <div style={{ marginTop: "4px" }}>
      <NotificationWarning />
    </div>
  );

  showNotification({ title, content, icon });
  expect(notificationOpenSpy).toHaveBeenCalledTimes(1);
});

test("showNotification overdue", () => {
  jest.resetAllMocks();
  const notificationOpenSpy = jest.spyOn(notification, "open");
  const id = "123";
  const title = "Просроченные";
  const content = <div />;
  const icon = (
    <div style={{ marginTop: "4px" }}>
      <img />
    </div>
  );

  showNotification({ id, title, content, icon });
  expect(notificationOpenSpy).toHaveBeenCalledTimes(1);
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

test("updateNotificationStatus change notifications", () => {
  const notifications: NotificationProps[] = [
    {
      id: "123",
      content: <div />,
      title: "hello",
      status: "unread",
    },
    {
      id: "345",
      content: <div />,
      title: "by",
      status: "read",
    },
  ];

  expect(updateNotificationStatus("123", notifications, "read")).toStrictEqual([
    {
      ...notifications[0],
      status: "read",
    },
    notifications[1],
  ]);
});

test("updateNotificationStatus don't change notifications", () => {
  const notifications: NotificationProps[] = [
    {
      id: "123",
      content: <div />,
      title: "hello",
      status: "unread",
    },
    {
      id: "345",
      content: <div />,
      title: "by",
      status: "read",
    },
  ];

  expect(
    updateNotificationStatus("123", notifications, "unread")
  ).toStrictEqual(notifications);
});
