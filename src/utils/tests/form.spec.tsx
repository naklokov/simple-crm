import React from "react";
import { isValuesChanged } from "../form";

const prev = {
  id: 1,
  value: "test",
  method: {
    ui: 123,
  },
};

test("isValuesChanged", () => {
  const next = {
    ...prev,
    id: 2,
    lolo: "dasd",
  };

  const moreProps = {
    ...prev,
    lolo: 1231,
    test: "ddd",
  };

  expect(isValuesChanged(prev, prev)).toBe(false);
  expect(isValuesChanged(prev, moreProps)).toBe(false);
  expect(isValuesChanged(prev, next)).toBe(true);
});
