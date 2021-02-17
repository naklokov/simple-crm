import moment from "moment-timezone";
import {
  getDateAfterRsql,
  getDateBeforeRsql,
  getDateBetweenRsql,
  getFieldEqualRsql,
  getEqualRsql,
  getSearchRsql,
  getLikeRsql,
  getDateFieldBetweenRsql,
  getDateFieldBeforeRsql,
  getDateFieldAfterRsql,
} from "../rsql";
import { RSQL_OPERATORS_MAP } from "../../constants";

test("getLikeRsql", () => {
  const keys = ["id", "name"];
  const searched = "123ghbdtnпривет !\"\"'' ";
  const entity = "someKey";
  expect(getLikeRsql(keys, searched, entity)).toEqual({
    key: entity,
    operator: RSQL_OPERATORS_MAP.LIKE,
    value: `(id,name,\"${searched}\")`,
  });
});

test("getSearchRsql", () => {
  const keys = ["id", "name"];
  const searched = ' "КаЛина 123 \' ?!@ красная"""    ';
  expect(getSearchRsql(keys, searched)).toEqual({
    key: "entityData",
    operator: RSQL_OPERATORS_MAP.LIKE,
    value: '(id,name,"\\"калина 123 \' ?!@ красная\\"\\"\\"")',
  });
});

test("getDateIsBetweenRsql", () => {
  const date = moment().toISOString();

  expect(getDateBetweenRsql(date)).toEqual({
    key: "date",
    operator: RSQL_OPERATORS_MAP.DATE_IS_BETWEEN,
    value: `${moment(date).startOf("day").toISOString()},${moment(date)
      .endOf("day")
      .toISOString()}`,
  });
});

test("getDateIsBeforeRsql", () => {
  const date = moment().toISOString();

  expect(getDateBeforeRsql(date)).toEqual({
    key: "date",
    operator: RSQL_OPERATORS_MAP.DATE_IS_BEFORE,
    value: date,
  });
});

test("getDateIsAfterRsql", () => {
  const date = moment().toISOString();

  expect(getDateAfterRsql(date)).toEqual({
    key: "date",
    operator: RSQL_OPERATORS_MAP.DATE_IS_AFTER,
    value: date,
  });
});

test("getDateFieldIsBetweenRsql", () => {
  const date = moment().toISOString();
  const fieldCode = "kakayatoData";

  expect(getDateFieldBetweenRsql({ date, fieldCode })).toEqual({
    key: "entityData",
    operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BETWEEN,
    value: `(${fieldCode},\"${moment(date)
      .startOf("day")
      .toISOString()}\",\"${moment(date).endOf("day").toISOString()}\")`,
  });
});

test("getDateFieldIsBeforeRsql", () => {
  const date = moment().toISOString();
  const fieldCode = "kakayatoData";

  expect(getDateFieldBeforeRsql({ date, fieldCode })).toEqual({
    key: "entityData",
    operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_BEFORE,
    value: `(${fieldCode},\"${date}\")`,
  });
});

test("getDateFieldIsAfterRsql", () => {
  const date = moment().toISOString();
  const fieldCode = "kakayatoData";

  expect(getDateFieldAfterRsql({ date, fieldCode })).toEqual({
    key: "entityData",
    operator: RSQL_OPERATORS_MAP.DATE_FIELD_IS_AFTER,
    value: `(${fieldCode},\"${date}\")`,
  });
});

test("getFieldEqualRsql", () => {
  const searched = "test";
  const fieldCode = "someCode";

  expect(getFieldEqualRsql({ searched, fieldCode })).toEqual({
    key: "entityData",
    operator: RSQL_OPERATORS_MAP.FIELD_EQUAL,
    value: `(${fieldCode},"${searched}")`,
  });
});

test("getEqualRsql", () => {
  const key = "kkk";
  const value = "vvv";
  expect(getEqualRsql(key, value)).toEqual({ key, value });
});
