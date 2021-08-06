import {
  RSQL_OPERATORS_MAP,
  TASK_STATUSES,
  TASK_STATUS_FIELD_CODE,
} from "../../constants";
import {
  getExtraRsql,
  getDateRsql,
  getOverdueRsql,
  getTommorowRsql,
} from "../tasks";

test("getExtraRsql", () => {
  const profileInfoId = "123";

  expect(getExtraRsql(profileInfoId)).toEqual([
    {
      key: "userProfileId",
      value: profileInfoId,
    },
    {
      key: "entityData",
      operator: RSQL_OPERATORS_MAP.FIELD_EQUAL,
      value: `(${TASK_STATUS_FIELD_CODE},"${TASK_STATUSES.NOT_COMPLETED}")`,
    },
  ]);
});

test("getDateRsql", () => {
  const date = "2020-12-01T00:10:00";
  const userProfileId = "1234";

  expect(getDateRsql(date, userProfileId)).toBe(
    'userProfileId==1234;entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"2020-11-30T21:00:00.000Z","2020-12-01T20:59:59.999Z")'
  );
});

test("getOverdueRsql", () => {
  const date = "2020-12-01T00:10:00";
  const userProfileId = "1234";

  expect(getOverdueRsql(date, userProfileId)).toBe(
    'userProfileId==1234;entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBEFORE=(taskEndDate,"2020-11-30T20:59:59.999Z")'
  );
});

test("getTommorowRsql", () => {
  const date = "2020-12-01T00:10:00";
  const userProfileId = "1234";

  expect(getTommorowRsql(date, userProfileId)).toBe(
    'userProfileId==1234;entityData=JEQ=(taskStatus,"NOT_COMPLETED");entityData=JDATEBTWN=(taskEndDate,"2020-12-01T21:00:00.000Z","2020-12-02T20:59:59.999Z")'
  );
});
