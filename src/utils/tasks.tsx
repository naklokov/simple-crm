import moment from "moment-timezone";
import {
  RsqlParamProps,
  TASK_DATE_FIELD_CODE,
  TASK_STATUSES,
  TASK_STATUS_FIELD_CODE,
} from "../constants";
import {
  getDateFieldBeforeRsql,
  getDateFieldBetweenRsql,
  getFieldEqualRsql,
  getRsqlParams,
} from "./rsql";
import { TaskSortType } from "../forms/tasks/constants";

export const getExtraRsql = (profileInfoId: string): RsqlParamProps[] => [
  { key: "userProfileId", value: profileInfoId },
  getFieldEqualRsql({
    searched: TASK_STATUSES.NOT_COMPLETED,
    fieldCode: TASK_STATUS_FIELD_CODE,
  }),
];

export const getTasksSorted = (order: TaskSortType = "asc") =>
  `${TASK_DATE_FIELD_CODE}:${order}`;

export const getDateRsql = (
  date: string,
  profileInfoId: string,
  unitOfTime?: moment.unitOfTime.StartOf
) =>
  getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldBetweenRsql({
      date,
      unitOfTime,
    }),
  ]);

export const getTommorowRsql = (
  selectedDate: string,
  profileInfoId: string
) => {
  const date = moment(selectedDate).add(1, "days").toISOString();

  return getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldBetweenRsql({ date }),
  ]);
};

export const getOverdueRsql = (selectedDate: string, profileInfoId: string) => {
  const date = moment(selectedDate)
    .subtract(1, "days")
    .endOf("day")
    .toISOString();
  return getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldBeforeRsql({ date }),
  ]);
};
