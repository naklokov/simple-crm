import moment from "moment-timezone";
import * as redux from "react-redux";
import { renderHook } from "@testing-library/react-hooks";
import { DATE_FORMATS, TASK_STATUSES } from "../../../constants";

import {
  checkDaysEqual,
  checkOverdue,
  checkRenderToday,
  checkRenderTommorow,
  getTitle,
  useColumns,
} from "../utils";

test("checkDaysEqual", () => {
  const currentIso = "2020-07-30T15:00:58.475";
  const day1 = moment(currentIso).add(10, "minutes").toISOString();
  const day2 = moment(currentIso).subtract(1, "hours").toISOString();
  const day3 = moment(currentIso).add(1, "days").toISOString();
  expect(checkDaysEqual(currentIso, day1)).toBe(true);
  expect(checkDaysEqual(currentIso, day2)).toBe(true);
  expect(checkDaysEqual(currentIso, day3)).toBe(false);
});

test("checkOverdue", () => {
  const overdue1 = moment().subtract(1, "minutes").toISOString();
  const overdue2 = moment().subtract(1, "days").toISOString();
  const notOverdue = moment().add(1, "minutes").toISOString();

  expect(checkOverdue(overdue1)).toBe(true);
  expect(checkOverdue(overdue2)).toBe(true);
  expect(checkOverdue(notOverdue)).toBe(false);
});

test("checkRenderToday", () => {
  const today = moment().add(2, "minutes").toISOString();
  const notToday = moment().add(2, "days").toISOString();

  expect(checkRenderToday(today, 0)).toBe(true);
  expect(checkRenderToday(today, 1)).toBe(false);
  expect(checkRenderToday(notToday, 0)).toBe(false);
  expect(checkRenderToday(notToday, 1)).toBe(false);
});

test("checkRenderTommorow", () => {
  const tommorow = moment().add(1, "days").toISOString();
  const notTommorow = moment().subtract(1, "days").toISOString();

  expect(checkRenderTommorow(tommorow, 0)).toBe(false);
  expect(checkRenderTommorow(tommorow, 1)).toBe(true);
  expect(checkRenderTommorow(notTommorow, 0)).toBe(false);
  expect(checkRenderTommorow(notTommorow, 1)).toBe(false);
});

test("getTitle", () => {
  const tSpy = jest.fn();
  const sampleDate = moment().subtract(2, "months").toISOString();
  const today = moment().toISOString();
  const tomorrow = moment().add(1, "days").toISOString();

  expect(getTitle(sampleDate, 1, tSpy)).toEqual(
    moment(sampleDate).format(DATE_FORMATS.DATE)
  );
  expect(tSpy).not.toHaveBeenCalled();
  tSpy.mockReset();

  getTitle(today, 0, tSpy);
  expect(tSpy).toHaveBeenCalledWith("today.title");
  tSpy.mockReset();

  getTitle(tomorrow, 1, tSpy);
  expect(tSpy).toHaveBeenCalledWith("tommorow.title");
  tSpy.mockReset();
});

test("useColumns", () => {
  const selectedDate = "2021-02-03T15:00:00.000Z";
  const profileInfoId = "123";

  jest.spyOn(redux, "useSelector").mockReturnValue({ id: profileInfoId });

  const { result } = renderHook(() => useColumns(selectedDate));

  expect(result.current.columns[0]).toEqual({
    date: selectedDate,
    dateFormat: DATE_FORMATS.TIME,
    query:
      'entityData=JDATEBTWN=(taskEndDate,"2021-02-02T21:00:00.000Z","2021-02-03T20:59:59.999Z");userProfileId==123;entityData=JEQ=(taskStatus,"NOT_COMPLETED")',
    dividerColor: "#FAAD14",
    reloadKey: 1,
    title: "03.02.2021",
  });

  expect(result.current.columns[1]).toEqual({
    date: moment(selectedDate).add(1, "d").toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query:
      'entityData=JDATEBTWN=(taskEndDate,"2021-02-03T21:00:00.000Z","2021-02-04T20:59:59.999Z");userProfileId==123;entityData=JEQ=(taskStatus,"NOT_COMPLETED")',
    dividerColor: "#1890FF",
    reloadKey: 1,
    title: "04.02.2021",
  });

  expect(result.current.columns[2]).toEqual({
    date: "",
    dateFormat: DATE_FORMATS.DATE_TIME,
    query: `entityData=JDATEBEFORE=(taskEndDate,\"2021-02-03T15:00:00.000Z\");userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,\"NOT_COMPLETED\")`,
    dividerColor: "#B6232C",
    reloadKey: 1,
    title: "overdue.title",
  });
});
