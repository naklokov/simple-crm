import { loadState, saveState } from "../local-storage";

const state = {
  persist: {
    menuCollapsed: false,
    permissions: [],
    profileInfo: {
      id: 123,
    },
  },
};

test("loadState", () => {
  expect(loadState()).toEqual(void 0);

  localStorage.setItem("state", JSON.stringify(state));
  expect(loadState()).toEqual(state);

  localStorage.setItem("state", "undefined");
});

test("saveState", () => {
  expect(localStorage.getItem("state")).toBe("undefined");

  saveState(state.persist);
  expect(localStorage.getItem("state")).toBe(JSON.stringify(state));
});
