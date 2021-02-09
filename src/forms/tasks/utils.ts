import { isEqual } from "lodash";
import moment from "moment-timezone";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  DATE_FORMATS,
  EntityOwnerProps,
  RsqlParamProps,
  State,
  TASK_STATUSES,
} from "../../constants";
import {
  getDateFieldIsBetweenRsql,
  getFieldEqualRsql,
  getDateFieldIsBeforeRsql,
  getRsqlParams,
} from "../../utils";
import {
  TASK_STATUS_FIELD_CODE,
  ColumnTaskProps,
  DIVIDER_COLORS,
  TitleTypeType,
} from "./constants";

const checkOverdue = (date: string) =>
  moment(date).isBefore(moment().subtract(1, "days").endOf("day"));

const getExtraRsql = (profileInfoId: string): RsqlParamProps[] => [
  { key: "userProfileId", value: profileInfoId },
  getFieldEqualRsql(TASK_STATUSES.NOT_COMPLETED, TASK_STATUS_FIELD_CODE),
];

const getDateRsql = (date: string, profileInfoId: string) =>
  getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldIsBetweenRsql(date, "taskEndDate"),
  ]);

const getTommorowRsql = (selectedDate: string, profileInfoId: string) => {
  const date = moment(selectedDate).add(1, "days").toISOString();

  return getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldIsBetweenRsql(date, "taskEndDate"),
  ]);
};

const getOverdueRsql = (selectedDate: string, profileInfoId: string) => {
  const date = moment(selectedDate)
    .subtract(1, "days")
    .endOf("day")
    .toISOString();
  return getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldIsBeforeRsql(date, "taskEndDate"),
  ]);
};

const getColumn = (
  date: string | null,
  query: string,
  title: string,
  dividerColor: typeof DIVIDER_COLORS[number],
  titleType?: TitleTypeType,
  dateFormat = DATE_FORMATS.TIME
) => ({
  date,
  dateFormat,
  query,
  title,
  titleType,
  dividerColor,
  reloadKey: uuidv4(),
});

const getTodayColumns = (
  selectedDate: string,
  profileInfoId: string,
  t: Function
): ColumnTaskProps[] => {
  const todayRsql = getDateRsql(selectedDate, profileInfoId);
  const tommorowRsql = getTommorowRsql(selectedDate, profileInfoId);
  const overdueRsql = getOverdueRsql(selectedDate, profileInfoId);

  const today = getColumn(
    selectedDate,
    todayRsql,
    t("today.title"),
    DIVIDER_COLORS[0]
  );

  const tommorow = getColumn(
    moment(selectedDate).add(1, "day").toISOString(),
    tommorowRsql,
    t("tommorow.title"),
    DIVIDER_COLORS[1]
  );

  const overdue = getColumn(
    null,
    overdueRsql,
    t("overdue.title"),
    DIVIDER_COLORS[2],
    void 0,
    DATE_FORMATS.DATE_TIME
  );

  return [today, tommorow, overdue];
};

const getDateViewColumns = (selectedDate: string, profileInfoId: string) => {
  const initialDate = moment(selectedDate).subtract(1, "days").toISOString();
  return [...Array(3)].map((o, idx) => {
    const date = moment(initialDate).add(idx, "days");
    const isSelectedDate = checkDaysEqual(date.toISOString(), selectedDate);

    return getColumn(
      date.toISOString(),
      getDateRsql(date.toISOString(), profileInfoId),
      date.format(DATE_FORMATS.DATE),
      DIVIDER_COLORS[idx],
      !isSelectedDate ? "secondary" : void 0
    );
  });
};

export const checkDaysEqual = (date: string, comparedDate?: string) =>
  moment(date).isBetween(
    moment(comparedDate).startOf("day"),
    moment(comparedDate).endOf("day")
  );

export const getUpdatedColumns = (columns: ColumnTaskProps[], date: string) =>
  columns.map((column) => {
    debugger;
    if (column.date && checkDaysEqual(column.date, date)) {
      return {
        ...column,
        reloadKey: uuidv4(),
      };
    }

    if (!column.date && checkOverdue(date)) {
      return {
        ...column,
        reloadKey: uuidv4(),
      };
    }

    return column;
  });

export const useColumns = (selectedDate: string) => {
  const [t] = useTranslation("tasks");
  const [columns, setColumns] = useState<ColumnTaskProps[]>([]);
  const profileInfo = useSelector(
    (state: State) => state?.data?.profileInfo ?? ({} as EntityOwnerProps)
  );

  const isToday = checkDaysEqual(selectedDate);

  const reload = useCallback(
    (date: string) => {
      const updated = getUpdatedColumns(columns, date);

      if (!isEqual(updated, columns)) {
        setColumns(updated);
      }
    },
    [columns]
  );

  useEffect(() => {
    if (profileInfo.id) {
      const calendarColumns = isToday
        ? getTodayColumns(selectedDate, profileInfo.id, t)
        : getDateViewColumns(selectedDate, profileInfo.id);

      setColumns(calendarColumns);
    }
  }, [selectedDate, profileInfo.id]);

  return { columns, reload };
};
