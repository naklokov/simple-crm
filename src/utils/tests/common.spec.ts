import { concatErrorPath } from "..";

test("concatErrorPath", () => {
  expect(concatErrorPath(403)).toBe("/errors/403");
  expect(concatErrorPath(400)).toBe("/errors/400");
});
