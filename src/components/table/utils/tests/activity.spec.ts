import { renderHook } from "@testing-library/react-hooks";
import moment from "moment";
import { COLUMN_STATUS_MAP } from "../../constants";
import { useActivity } from "../activity";

test("useActivity active", () => {
  const date1 = moment().subtract(2, "hours").toISOString();
  const { result: active1 } = renderHook(() => useActivity(date1));
  expect(active1.current).toEqual({
    status: COLUMN_STATUS_MAP.ACTIVE,
    title: COLUMN_STATUS_MAP.ACTIVE,
  });

  const date2 = moment().subtract(30, "days").toISOString();
  const { result: active2 } = renderHook(() => useActivity(date2));
  expect(active2.current).toEqual({
    status: COLUMN_STATUS_MAP.ACTIVE,
    title: COLUMN_STATUS_MAP.ACTIVE,
  });
});

test("useActivity warning", () => {
  const date1 = moment().subtract(31, "days").toISOString();
  const { result: warning1 } = renderHook(() => useActivity(date1));
  expect(warning1.current).toEqual({
    status: COLUMN_STATUS_MAP.WARNING,
    title: COLUMN_STATUS_MAP.WARNING,
  });

  const date2 = moment().subtract(60, "days").toISOString();
  const { result: warning2 } = renderHook(() => useActivity(date2));
  expect(warning2.current).toEqual({
    status: COLUMN_STATUS_MAP.WARNING,
    title: COLUMN_STATUS_MAP.WARNING,
  });
});

test("useActivity expired", () => {
  const date1 = moment().subtract(61, "days").toISOString();
  const { result: expired1 } = renderHook(() => useActivity(date1));
  expect(expired1.current).toEqual({
    status: COLUMN_STATUS_MAP.EXPIRED,
    title: COLUMN_STATUS_MAP.EXPIRED,
  });

  const date2 = moment().subtract(999, "days").toISOString();
  const { result: expired2 } = renderHook(() => useActivity(date2));
  expect(expired2.current).toEqual({
    status: COLUMN_STATUS_MAP.EXPIRED,
    title: COLUMN_STATUS_MAP.EXPIRED,
  });
});
