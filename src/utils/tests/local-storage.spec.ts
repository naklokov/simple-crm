import { loadState, saveState } from "../local-storage";

const state = {
  persist: {
    permissions: [],
    auth: true,
    profileInfo: {},
  },
};

test("loadState", () => {
  expect(loadState()).toEqual(undefined);

  localStorage.setItem("state", JSON.stringify(state));
  expect(loadState()).toEqual(state);

  localStorage.setItem("state", "undefined");
});

test("saveState", () => {
  expect(localStorage.getItem("state")).toBe("undefined");

  saveState(state);
  expect(localStorage.getItem("state")).toBe(JSON.stringify(state));
});
