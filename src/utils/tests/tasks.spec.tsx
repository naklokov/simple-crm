import {
  RSQL_OPERATORS_MAP,
  TASK_STATUSES,
  TASK_STATUS_FIELD_CODE,
} from "../../constants";
import { getExtraRsql } from "../tasks";

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
