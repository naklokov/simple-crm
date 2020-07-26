import { loadState, saveState } from "../local-storage";

const state = {
  persist: {
    auth: false,
    loading: true,
    permissions: [],
  },
};

test("loadState", () => {
  expect(loadState()).toEqual(void 0);

  localStorage.setItem("state", JSON.stringify(state));
  expect(loadState()).toEqual(state);

  localStorage.setItem("state", void 0);
});

test("saveState", () => {
  expect(localStorage.getItem("state")).toBe("undefined");

  saveState(state);
  expect(localStorage.getItem("state")).toBe(JSON.stringify(state));
});
