import { State } from "../../constants";
import { loadState, saveState } from "../local-storage";

const state = {
  persist: {
    permissions: [],
    auth: true,
  },
};

test("loadState", () => {
  expect(loadState()).toEqual(void 0);

  localStorage.setItem("state", JSON.stringify(state));
  expect(loadState()).toEqual(state);

  localStorage.setItem("state", "undefined");
});

xtest("saveState", () => {
  expect(localStorage.getItem("state")).toBe("undefined");

  saveState(state);
  expect(localStorage.getItem("state")).toBe(JSON.stringify(state));
});
