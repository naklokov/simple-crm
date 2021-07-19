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
  getLikeFieldRsql,
  getInitialParams,
} from "../rsql";
import { RsqlParamProps, RSQL_OPERATORS_MAP } from "../../constants";

test("getInitialParams", () => {
  const initialSearch = "?query=one;two&test=1";

  expect(getInitialParams(initialSearch)).toEqual({
    initialQueries: ["one", "two"],
    initialSearchParams: { test: "1" },
  });
});

test("getInitialParams without ?", () => {
  const initialSearch = "query=one;two&test=1";

  expect(getInitialParams(initialSearch)).toEqual({
    initialQueries: ["one", "two"],
    initialSearchParams: { test: "1" },
  });
});

test("getInitialParams with empty query", () => {
  const initialSearch = "?query=&test=1";

  expect(getInitialParams(initialSearch)).toEqual({
    initialQueries: [],
    initialSearchParams: { test: "1" },
  });
});

test("getInitialParams without query", () => {
  const initialSearch = "?test=2";

  expect(getInitialParams(initialSearch)).toEqual({
    initialQueries: [],
    initialSearchParams: { test: "2" },
  });
});

test("getInitialParams without initialSearch", () => {
  const initialSearch = "";

  expect(getInitialParams(initialSearch)).toEqual({
    initialQueries: [],
    initialSearchParams: {},
  });
});

test("getInitialParams", () => {
  const initialSearch = "query=userProfile=JLIKE=test;id==4321&field=123";

  expect(getInitialParams(initialSearch)).toEqual({
    initialQueries: ["userProfile=JLIKE=test", "id==4321"],
    initialSearchParams: { field: "123" },
  });

  expect(getInitialParams("field=123")).toEqual({
    initialQueries: [],
    initialSearchParams: { field: "123" },
  });

  expect(getInitialParams("")).toEqual({
    initialQueries: [],
    initialSearchParams: {},
  });
});

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
  const key = "id";
  const value = "123";

  expect(getLikeRsql(key, value)).toEqual({
    key,
    operator: RSQL_OPERATORS_MAP.LIKE,
    value,
  });
});

test("getLikeFieldRsql", () => {
  const keys = ["id", "name"];
  const searched = "123ghbdtnпривет !\"\"'' ";
  const entity = "someKey";
  expect(getLikeFieldRsql(keys, searched, entity)).toEqual({
    key: entity,
    operator: RSQL_OPERATORS_MAP.LIKE_FIELD,
    value: `(id,name,\"${searched}\")`,
  });
});

test("getSearchRsql", () => {
  const keys = ["id", "name"];
  const searched = ' "КаЛина 123 \' ?!@ красная"""    ';
  expect(getSearchRsql(keys, searched)).toEqual({
    key: "entityData",
    operator: RSQL_OPERATORS_MAP.LIKE_FIELD,
    value: '(id,name,"%\\"калина 123 \' ?!@ красная\\"\\"\\"%")',
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

test("getValueFromRsql with JLIKE operator", () => {
  const query = 'entityData=JLIKE=(sample,"text")';
  expect(getValueFromRsql(query)).toBe("text");
});

test("getValueFromRsql with LIKE operator", () => {
  const query = "sample=LIKE=text";
  expect(getValueFromRsql(query)).toBe("text");
});

test("getValueFromRsql with date operator", () => {
  const query = 'entityData=JDATEBETWEEN=(dateFrom,"lololo1","lololo")';
  expect(getValueFromRsql(query)).toEqual(["lololo1", "lololo"]);
});

test("getValueFromRsql with another operator", () => {
  const query = 'entityData=JDATEBETWEEN=(dateFrom,"lololo")';
  expect(getValueFromRsql(query)).toEqual("lololo");
});
