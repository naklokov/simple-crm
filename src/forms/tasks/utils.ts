import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import {
  DATE_FORMATS,
  EntityOwnerProps,
  State,
  TASK_STATUSES,
} from "../../constants";
import {
  getDateFieldIsBetweenRsql,
  getFieldEqualRsql,
  getDateFieldIsBeforeRsql,
  getRsqlParams,
} from "../../utils";
import { isEqual, last } from "lodash";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

interface ColumnProps {
  date: string;
  title: string;
  query: string;
  dividerColor: typeof DIVIDER_COLORS[number];
  reloadKey: string;
  dateFormat: string;
}

const DIVIDER_COLORS = ["#FAAD14", "#1890FF", "#B6232C"];
const TASK_STATUS_FIELD_CODE = "taskStatus";

const notCompletedRsql = getFieldEqualRsql(
  TASK_STATUSES.NOT_COMPLETED,
  TASK_STATUS_FIELD_CODE
);

export const checkDaysEqual = (date: string, comparedDate?: string) =>
  moment(date).isBetween(
    moment(comparedDate).startOf("day"),
    moment(comparedDate).endOf("day")
  );

export const checkOverdue = (date: string) => moment(date).isBefore(moment());

export const checkRenderToday = (date: string, idx: number) =>
  checkDaysEqual(date) && idx === 0;

export const checkRenderTommorow = (date: string, idx: number) =>
  checkDaysEqual(moment(date).subtract(1, "days").toISOString()) && idx === 1;

export const getTitle = (date: string, idx: number, t: Function) => {
  const isToday = checkRenderToday(date, idx);
  const isTomorrow = checkRenderTommorow(date, idx);

  if (isToday) {
    return t("today.title");
  } else if (isTomorrow) {
    return t("tommorow.title");
  } else {
    return moment(date).format(DATE_FORMATS.DATE);
  }
};

export const useColumns = (selectedDate: string) => {
  const [t] = useTranslation("tasks");
  const [columns, setColumns] = useState<ColumnProps[]>([]);
  const profileInfo = useSelector(
    (state: State) => state?.data?.profileInfo ?? ({} as EntityOwnerProps)
  );

  const reload = useCallback(
    (date: string) => {
      const updated = columns.map((column) => {
        if (checkDaysEqual(column.date, date)) {
          return {
            ...column,
            reloadKey: uuidv4(),
          };
        }

        if (checkOverdue(date) && !column.date) {
          return {
            ...column,
            reloadKey: uuidv4(),
          };
        }

        return column;
      });

      if (!isEqual(updated, columns)) {
        setColumns(updated);
      }
    },
    [columns]
  );

  useEffect(() => {
    if (profileInfo.id) {
      const calendarColumns: ColumnProps[] = [...Array(2)].map((o, idx) => {
        const date = moment(selectedDate).add(idx, "days").toISOString();
        return {
          date,
          dateFormat: DATE_FORMATS.TIME,
          query: getRsqlParams([
            getDateFieldIsBetweenRsql(date, "taskEndDate"),
            { key: "userProfileId", value: profileInfo.id },
            notCompletedRsql,
          ]),
          title: getTitle(date, idx, t),
          dividerColor: DIVIDER_COLORS[idx],
          reloadKey: uuidv4(),
        };
      });

      const overdueColumn = {
        date: "",
        dateFormat: DATE_FORMATS.DATE_TIME,
        query: getRsqlParams([
          getDateFieldIsBeforeRsql(selectedDate, "taskEndDate"),
          { key: "userProfileId", value: profileInfo.id },
          notCompletedRsql,
        ]),
        title: t("overdue.title"),
        dividerColor: last(DIVIDER_COLORS) || "",
        reloadKey: uuidv4(),
      };

      setColumns([...calendarColumns, overdueColumn]);
    }
  }, [selectedDate, profileInfo.id]);

  return { columns, reload };
};
