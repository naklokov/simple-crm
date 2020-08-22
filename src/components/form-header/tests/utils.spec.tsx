import { findName } from "../utils";

test("findName", () => {
  expect(findName("/crm/clients")).toBe("Клиенты");
});
