import moment from "moment-timezone";
import { RsqlParamProps, TASK_STATUSES } from "../constants";
import {
  getDateFieldBeforeRsql,
  getDateFieldBetweenRsql,
  getFieldEqualRsql,
  getRsqlParams,
} from "./rsql";

export const TASK_STATUS_FIELD_CODE = "taskStatus";
export const TASK_DATE_FIELD_CODE = "taskEndDate";

const getExtraRsql = (profileInfoId: string): RsqlParamProps[] => [
  { key: "userProfileId", value: profileInfoId },
  getFieldEqualRsql(TASK_STATUSES.NOT_COMPLETED, TASK_STATUS_FIELD_CODE),
];

export const getTasksSorted = (order: "asc" | "desc" = "asc") =>
  `${TASK_DATE_FIELD_CODE}:${order}`;

export const getDateRsql = (
  date: string,
  profileInfoId: string,
  unitOfTime?: moment.unitOfTime.StartOf
) =>
  getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldBetweenRsql(date, TASK_DATE_FIELD_CODE, unitOfTime),
  ]);

export const getTommorowRsql = (
  selectedDate: string,
  profileInfoId: string
) => {
  const date = moment(selectedDate).add(1, "days").toISOString();

  return getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldBetweenRsql(date, TASK_DATE_FIELD_CODE),
  ]);
};

export const getOverdueRsql = (selectedDate: string, profileInfoId: string) => {
  const date = moment(selectedDate)
    .subtract(1, "days")
    .endOf("day")
    .toISOString();
  return getRsqlParams([
    ...getExtraRsql(profileInfoId),
    getDateFieldBeforeRsql(date, TASK_DATE_FIELD_CODE),
  ]);
};
