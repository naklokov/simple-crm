import { getInitialValues } from "../form-builder";

test("getInitialValues", () => {
  const history = {
    location: {
      state: {
        username: "lol",
      },
    },
  };
  expect(getInitialValues(history)).toEqual({ username: "lol" });
  expect(getInitialValues({})).toEqual({ username: "" });
});
