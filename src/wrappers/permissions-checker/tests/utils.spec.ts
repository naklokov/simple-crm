import { hasPermission, filterArrayByPermissions, isCanShow } from "../utils";

const all = ["delete", "update", "add", "kick_all"];

const available = ["kick_all"];

test("isCanShow", () => {
  expect(isCanShow(available, all, false)).toBe(false);
  expect(isCanShow(available, all, true)).toBe(true);
  expect(isCanShow(["test"], all, true)).toBe(false);
});
test("hasPermissions with available permissions", () => {
  expect(hasPermission(available, all)).toBe(true);
});

test("hasPermissions with not available permissions", () => {
  expect(hasPermission(["laught"], all)).toBe(false);
});

test("hasPermissions with empty all", () => {
  expect(hasPermission(available, [])).toBe(true);
});

test("hasPermissions with empty available", () => {
  expect(hasPermission([], all)).toBe(true);
});

test("filterArrayByPermissions", () => {
  const array = [
    {
      id: 1,
      permissions: [],
    },
    {
      id: 2,
      permissions: ["add"],
    },
    {
      id: 3,
      permissions: ["lol"],
    },
  ];

  const filtered = filterArrayByPermissions(array, all);

  expect(filtered).toEqual(array.filter((item) => item.id !== 3));
});
