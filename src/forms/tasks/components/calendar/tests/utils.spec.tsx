import { getCellColor, useBadgeMap } from "../utils";
import { renderHook, act } from "@testing-library/react-hooks";
import moment from "moment-timezone";
import axios from "axios";
import * as redux from "react-redux";
import { CELL_COLORS } from "../../../constants";
import MockAdapter from "axios-mock-adapter";
import { urls } from "../../../../../constants";
import { TASKS_ENTITY_STUB } from "./stub";

const mock = new MockAdapter(axios);

test("getCellColor selected", () => {
  const date = moment("2000-07-30T09:00:00.475").toISOString();
  const selectedDate = "2000-07-30T15:00:00.475";
  const selectedMonth = "2000-07-15T15:00:00.475";

  expect(getCellColor(date, selectedDate, selectedMonth)).toBe(
    CELL_COLORS.SELECTED
  );
});

test("getCellColor month in view", () => {
  const date = moment("2000-07-02T09:00:00.475").toISOString();
  const selectedDate = "2000-07-30T15:00:00.475";
  const selectedMonth = "2000-07-15T15:00:00.475";

  expect(getCellColor(date, selectedDate, selectedMonth)).toBe(
    CELL_COLORS.VIEW
  );
});

test("getCellColor month not in view", () => {
  const date = moment("2000-09-02T09:00:00.475").toISOString();
  const selectedDate = "2000-07-30T15:00:00.475";
  const selectedMonth = "2000-07-15T15:00:00.475";

  expect(getCellColor(date, selectedDate, selectedMonth)).toBe(
    CELL_COLORS.NOT_VIEW
  );
});

test("useBadgeMap", async () => {
  const selectedDate = "2000-07-30T15:00:00.475";
  mock.onGet(urls.tasks.entity).reply(200, TASKS_ENTITY_STUB);
  const profileInfo = { id: "123" };
  jest.spyOn(redux, "useSelector").mockReturnValue(profileInfo);

  const { result } = renderHook(() => useBadgeMap(selectedDate));

  expect(result.current.loading).toBe(true);
  expect(result.current.map).toEqual({});
  await act(async () => {});

  expect(result.current.loading).toBe(false);
  expect(result.current.map).toEqual({
    "15.12.2020": 2,
    "22.12.2020": 1,
  });

  mock.reset();
  mock
    .onGet(urls.tasks.entity)
    .reply(200, [...TASKS_ENTITY_STUB, ...TASKS_ENTITY_STUB]);

  act(() => {
    result.current.reload();
  });
  expect(result.current.loading).toBe(true);
  expect(result.current.map).toEqual({
    "15.12.2020": 2,
    "22.12.2020": 1,
  });

  await act(async () => {});
  expect(result.current.loading).toBe(false);
  expect(result.current.map).toEqual({
    "15.12.2020": 4,
    "22.12.2020": 2,
  });
});
