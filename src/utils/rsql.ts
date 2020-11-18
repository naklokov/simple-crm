import moment from "moment-timezone";
import { RsqlParamProps, RSQL_OPERATORS_MAP } from "../constants";

export const getRsqlDateBefore = (
  key: string,
  value: moment.Moment = moment()
): RsqlParamProps => ({
  key,
  operator: RSQL_OPERATORS_MAP.DATE_BEFORE,
  value: `(${value.toISOString()})`,
});

export const getRsqlDateBetween = (
  key: string,
  from: moment.Moment = moment(),
  to: moment.Moment = moment()
): RsqlParamProps => ({
  key,
  operator: RSQL_OPERATORS_MAP.DATE_BETWEEN,
  value: `(${from.toISOString()},${to.toISOString()})`,
});
