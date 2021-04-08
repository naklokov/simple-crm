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
  getValueFromRsql,
  getRsqlParams,
} from "../rsql";
import { RsqlParamProps, RSQL_OPERATORS_MAP } from "../../constants";

test("getRsqlParams", () => {
  const params: RsqlParamProps[] = [
    {
      key: "key1",
      value: 1,
    },
    {
      key: "key2",
      value: 2,
      operator: "OPER",
    },
  ];

  expect(getRsqlParams(params)).toBe("key1==1;key2OPER2");
});

test("getRsqlParams with empty params", () => {
  const params: RsqlParamProps[] = [];

  expect(getRsqlParams(params)).toBe("");
});

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

  expect(getDateBetweenRsql({ searched: date })).toEqual({
    key: "date",
    operator: RSQL_OPERATORS_MAP.DATE_IS_BETWEEN,
    value: `("${moment(date).startOf("day").toISOString()}","${moment(date)
      .endOf("day")
      .toISOString()}")`,
  });
});

test("getDateIsBeforeRsql", () => {
  const date = moment().toISOString();

  expect(getDateBeforeRsql({ searched: date })).toEqual({
    key: "date",
    operator: RSQL_OPERATORS_MAP.DATE_IS_BEFORE,
    value: date,
  });
});

test("getDateIsAfterRsql", () => {
  const date = moment().toISOString();

  expect(getDateAfterRsql({ searched: date })).toEqual({
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

test("getValueFromRsql with EQUAL operator", () => {
  const query = "userProfileId==12345";
  expect(getValueFromRsql(query)).toBe("12345");
});

test("getValueFromRsql with date operator", () => {
  const query = 'entityData=JDATEBETWEEN=(dateFrom,"lololo1","lololo")';
  expect(getValueFromRsql(query)).toBe("lololo");
});

test("getValueFromRsql with another operator", () => {
  const query = 'entityData=JDATEBETWEEN=(dateFrom,"lololo")';
  expect(getValueFromRsql(query)).toBe("lololo");
});
