import { RSQL_OPERATORS_MAP } from "../../../../constants";
import { getEqualRsql, getLikeRsql, getServerPagingRsql } from "../rsql";

test("getEqualRsql", () => {
  const key = "kkk";
  const value = "vvv";
  expect(getEqualRsql(key, value)).toEqual({ key, value });
});

// test("getLikeRsql", () => {
//   const keys = ["id", "name"];
//   const searched = "КаЛина красная ";
//   expect(getLikeRsql(keys, searched)).toEqual({
//     key: "entityData",
//     operator: RSQL_OPERATORS_MAP.LIKE,
//     value: `(id,name,калина красная)`,
//   });
// });

test("getServerPagingRsql", () => {});
