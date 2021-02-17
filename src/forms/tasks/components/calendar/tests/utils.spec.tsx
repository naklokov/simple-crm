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

  expect(result.current).toEqual({ map: {}, loading: true });
  await act(async () => {});

  expect(result.current).toEqual({
    map: {
      "15.12.2020": 2,
      "22.12.2020": 1,
    },
    loading: false,
  });
});
