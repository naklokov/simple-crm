import moment from "moment-timezone";
import * as redux from "react-redux";
import { renderHook } from "@testing-library/react-hooks";
import * as uuid from "uuid";
import { DATE_FORMATS } from "../../../constants";

import { useColumns, checkDaysEqual, getUpdatedColumns } from "../utils";
import { ColumnTaskProps, DIVIDER_COLORS } from "../constants";

const dateSampleIso = "2080-07-30T15:00:58.475";

const columns: ColumnTaskProps[] = [
  {
    title: "Сегодня",
    date: moment().toISOString(),
    dateFormat: DATE_FORMATS.DATE_TIME,
    dividerColor: "#FFFFFF",
    query: "ololo",
    reloadKey: "111",
    titleType: void 0,
  },
  {
    title: "Просроченные",
    date: null,
    dateFormat: DATE_FORMATS.DATE_TIME,
    dividerColor: "#FFFFFF",
    query: "ololo",
    reloadKey: "222",
    titleType: void 0,
  },
  {
    title: moment(dateSampleIso).format(DATE_FORMATS.DATE),
    date: dateSampleIso,
    dateFormat: DATE_FORMATS.DATE_TIME,
    dividerColor: "#FFFFFF",
    query: "ololo",
    reloadKey: "333",
    titleType: void 0,
  },
];

test("checkDaysEqual", () => {
  const currentIso = "2020-07-30T15:00:58.475";
  const day1 = moment(currentIso).add(10, "minutes").toISOString();
  const day2 = moment(currentIso).subtract(1, "hours").toISOString();
  const day3 = moment(currentIso).add(1, "days").toISOString();
  expect(checkDaysEqual(currentIso, day1)).toBe(true);
  expect(checkDaysEqual(currentIso, day2)).toBe(true);
  expect(checkDaysEqual(currentIso, day3)).toBe(false);
});

test("checkDaysEqual near midnight", () => {
  const date = "2021-02-10T22:05:18.939";
  const compareDate = "2021-02-11T14:38:24.295Z";
  expect(checkDaysEqual(date, compareDate)).toBe(true);
});

test("checkDaysEqual correct check today", () => {
  const todayEvening = moment().startOf("day").toISOString();
  const todayMorning = moment().endOf("day").toISOString();
  const notToday = moment().endOf("day").add(1, "hours").toISOString();
  expect(checkDaysEqual(todayEvening)).toBe(true);
  expect(checkDaysEqual(todayMorning)).toBe(true);
  expect(checkDaysEqual(notToday)).toBe(false);
});

test("getUpdatedColumns", () => {
  const uuidv4Spy = jest.spyOn(uuid, "v4");

  const updatedOverdue = getUpdatedColumns(
    columns,
    moment().subtract(1, "days").toISOString()
  );
  expect(updatedOverdue[0].reloadKey).toBe("111");
  expect(updatedOverdue[1].reloadKey).toBe("1");
  expect(updatedOverdue[2].reloadKey).toBe("333");
  expect(uuidv4Spy).toHaveBeenCalledTimes(1);

  const updatedToday = getUpdatedColumns(columns, moment().toISOString());
  expect(updatedToday[0].reloadKey).toBe("1");
  expect(updatedToday[1].reloadKey).toBe("222");
  expect(updatedToday[2].reloadKey).toBe("333");
  expect(uuidv4Spy).toHaveBeenCalledTimes(2);

  const updatedDate = getUpdatedColumns(columns, dateSampleIso);
  expect(updatedDate[0].reloadKey).toBe("111");
  expect(updatedDate[1].reloadKey).toBe("222");
  expect(updatedDate[2].reloadKey).toBe("1");
  expect(uuidv4Spy).toHaveBeenCalledTimes(3);

  const notUpdated = getUpdatedColumns(
    columns,
    moment().add(20, "days").toISOString()
  );
  expect(columns).toEqual(notUpdated);
  expect(uuidv4Spy).toHaveBeenCalledTimes(3);
});

test("useColumns date mode", () => {
  const selectedDate = "2021-02-03T15:00:00.000Z";
  const profileInfoId = "123";

  jest.spyOn(redux, "useSelector").mockReturnValue({ id: profileInfoId });

  const { result } = renderHook(() => useColumns(selectedDate));

  const firstDate = moment(selectedDate).subtract(1, "days");
  expect(result.current.columns[0]).toEqual({
    date: firstDate.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"${firstDate
      .startOf("day")
      .toISOString()}","${firstDate.endOf("day").toISOString()}")`,
    dividerColor: DIVIDER_COLORS[0],
    reloadKey: "1",
    title: firstDate.format(DATE_FORMATS.DATE),
    titleType: "secondary",
  });

  const secondDay = moment(selectedDate);
  expect(result.current.columns[1]).toEqual({
    date: secondDay.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"${secondDay
      .startOf("day")
      .toISOString()}","${secondDay.endOf("day").toISOString()}")`,
    dividerColor: DIVIDER_COLORS[1],
    reloadKey: "1",
    title: secondDay.format(DATE_FORMATS.DATE),
    titleType: void 0,
  });

  const thirdDay = moment(selectedDate).add(1, "days");
  expect(result.current.columns[2]).toEqual({
    date: thirdDay.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"${thirdDay
      .startOf("day")
      .toISOString()}","${thirdDay.endOf("day").toISOString()}")`,
    dividerColor: DIVIDER_COLORS[2],
    reloadKey: "1",
    title: thirdDay.format(DATE_FORMATS.DATE),
    titleType: "secondary",
  });
});

test("useColumns date mode (near today date)", () => {
  const selectedDate = moment().add(1, "days").toISOString();
  const profileInfoId = "123";

  jest.spyOn(redux, "useSelector").mockReturnValue({ id: profileInfoId });

  const { result } = renderHook(() => useColumns(selectedDate));

  const firstDate = moment(selectedDate).subtract(1, "days");
  expect(result.current.columns[0]).toEqual({
    date: firstDate.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"${firstDate
      .startOf("day")
      .toISOString()}","${firstDate.endOf("day").toISOString()}")`,
    dividerColor: DIVIDER_COLORS[0],
    reloadKey: "1",
    title: firstDate.format(DATE_FORMATS.DATE),
    titleType: "secondary",
  });

  const secondDay = moment(selectedDate);
  expect(result.current.columns[1]).toEqual({
    date: secondDay.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"${secondDay
      .startOf("day")
      .toISOString()}","${secondDay.endOf("day").toISOString()}")`,
    dividerColor: DIVIDER_COLORS[1],
    reloadKey: "1",
    title: secondDay.format(DATE_FORMATS.DATE),
    titleType: void 0,
  });

  const thirdDay = moment(selectedDate).add(1, "days");
  expect(result.current.columns[2]).toEqual({
    date: thirdDay.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"${thirdDay
      .startOf("day")
      .toISOString()}","${thirdDay.endOf("day").toISOString()}")`,
    dividerColor: DIVIDER_COLORS[2],
    reloadKey: "1",
    title: thirdDay.format(DATE_FORMATS.DATE),
    titleType: "secondary",
  });
});

test("useColumns today mode", () => {
  const selectedDate = moment().toISOString();
  const profileInfoId = "123";

  jest.spyOn(redux, "useSelector").mockReturnValue({ id: profileInfoId });

  const { result } = renderHook(() => useColumns(selectedDate));

  const firstDate = moment(selectedDate);
  expect(result.current.columns[0]).toEqual({
    date: firstDate.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,\"NOT_COMPLETED\");entityData=JDATEBTWN=(taskEndDate,\"${firstDate
      .startOf("day")
      .toISOString()}\",\"${firstDate.endOf("day").toISOString()}\")`,
    dividerColor: DIVIDER_COLORS[0],
    reloadKey: "1",
    title: "today.title",
    titleType: void 0,
  });

  const secondDate = moment(selectedDate).add(1, "days");
  expect(result.current.columns[1]).toEqual({
    date: secondDate.toISOString(),
    dateFormat: DATE_FORMATS.TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,\"NOT_COMPLETED\");entityData=JDATEBTWN=(taskEndDate,\"${secondDate
      .startOf("day")
      .toISOString()}\",\"${secondDate.endOf("day").toISOString()}\")`,
    dividerColor: DIVIDER_COLORS[1],
    reloadKey: "1",
    title: "tommorow.title",
    titleType: void 0,
  });

  const thirdDate = moment(selectedDate).subtract(1, "days").endOf("day");
  expect(result.current.columns[2]).toEqual({
    date: null,
    dateFormat: DATE_FORMATS.DATE_TIME,
    query: `userProfileId==${profileInfoId};entityData=JEQ=(taskStatus,\"NOT_COMPLETED\");entityData=JDATEBEFORE=(taskEndDate,\"${thirdDate.toISOString()}\")`,
    dividerColor: DIVIDER_COLORS[2],
    reloadKey: "1",
    title: "overdue.title",
    titleType: void 0,
  });
});
