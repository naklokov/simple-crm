import Cookies from "js-cookie";

import { storeRememberMeParams, getPrevUrl } from "../conditional";

test("test storeRememberMeParams without cookie", () => {
  storeRememberMeParams();

  expect(localStorage.getItem("rememberMe")).toBeNull();
  expect(localStorage.getItem("username")).toBeNull();
});

test("test storeRememberMeParams with cookie", () => {
  Cookies.set("rememberMe", "true");
  Cookies.set("username", "123@mail.ru");

  storeRememberMeParams();
  expect(localStorage.getItem("rememberMe")).toBe("true");
  expect(localStorage.getItem("username")).toBe("123@mail.ru");
});

test("test getPrevUrl", () => {
  const history = {
    location: {
      state: {
        from: {
          pathname: "lolo",
        },
      },
    },
  };

  expect(getPrevUrl(history)).toBe("lolo");

  expect(getPrevUrl("")).toBe("/");
});
