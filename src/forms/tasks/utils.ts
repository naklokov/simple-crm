import { isEqual } from "lodash";
import moment from "moment-timezone";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DATE_FORMATS, State } from "../../constants";
import {
  getDateRsql,
  getDateWithTimezone,
  getOverdueRsql,
  getTommorowRsql,
} from "../../utils";
import { ColumnTaskProps, DIVIDER_COLORS, TitleTypeType } from "./constants";

const checkOverdue = (date: string) =>
  moment(date).isBefore(moment().subtract(1, "days").endOf("day"));

const getColumn = ({
  query,
  title,
  dividerColor,
  date = null,
  titleType,
  dateFormat = DATE_FORMATS.TIME,
  reloadKey = uuidv4(),
}: {
  query: string;
  title: string;
  dividerColor: typeof DIVIDER_COLORS[number];
  date?: string | null;
  titleType?: TitleTypeType;
  dateFormat?: string;
  reloadKey?: string;
}) => ({
  date,
  dateFormat,
  query,
  title,
  titleType,
  dividerColor,
  reloadKey,
});

const getTodayColumns = (
  date: string,
  profileInfoId: string,
  t: Function
): ColumnTaskProps[] => {
  const todayRsql = getDateRsql(date, profileInfoId);
  const tommorowRsql = getTommorowRsql(date, profileInfoId);
  const overdueRsql = getOverdueRsql(date, profileInfoId);

  const today = getColumn({
    date,
    query: todayRsql,
    title: t("today.title"),
    dividerColor: DIVIDER_COLORS[0],
  });

  const tommorow = getColumn({
    date: moment(date).add(1, "day").toISOString(),
    query: tommorowRsql,
    title: t("tommorow.title"),
    dividerColor: DIVIDER_COLORS[1],
  });

  const overdue = getColumn({
    query: overdueRsql,
    title: t("overdue.title"),
    dividerColor: DIVIDER_COLORS[2],
    dateFormat: DATE_FORMATS.DATE_TIME,
  });

  return [today, tommorow, overdue];
};

const getDateViewColumns = (selectedDate: string, profileInfoId: string) => {
  const initialDate = moment(selectedDate).subtract(1, "days").toISOString();
  return [...Array(3)].map((o, idx) => {
    const date = moment(initialDate).add(idx, "days");
    const isSelectedDate = checkDaysEqual(date.toISOString(), selectedDate);

    return getColumn({
      date: date.toISOString(),
      query: getDateRsql(date.toISOString(), profileInfoId),
      title: date.format(DATE_FORMATS.DATE),
      titleType: !isSelectedDate ? "secondary" : undefined,
      dividerColor: DIVIDER_COLORS[idx],
    });
  });
};

export const checkDaysEqual = (date: string, comparedDate?: string) => {
  const comparedDateWithTZ = getDateWithTimezone(comparedDate);
  return getDateWithTimezone(date).isSame(comparedDateWithTZ, "day");
};

export const getUpdatedColumns = (columns: ColumnTaskProps[], date: string) =>
  columns.map((column) => {
    // проверка для обычных колонок
    if (column.date && checkDaysEqual(column.date, date)) {
      return {
        ...column,
        reloadKey: uuidv4(),
      };
    }

    // проверка для колонки "Просроченные"
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
  const profileInfoId = useSelector(
    (state: State) => state?.persist?.profileInfo?.id
  );

  const isToday = useMemo(() => checkDaysEqual(selectedDate), [selectedDate]);

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
    if (profileInfoId) {
      const calendarColumns = isToday
        ? getTodayColumns(selectedDate, profileInfoId, t)
        : getDateViewColumns(selectedDate, profileInfoId);

      setColumns(calendarColumns);
    }
  }, [selectedDate, profileInfoId, isToday, t]);

  return { columns, reload };
};
