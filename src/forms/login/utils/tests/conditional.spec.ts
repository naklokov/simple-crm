import Cookies from "js-cookie";

import { storeRememberMeParams, getPrevUrl } from "../conditional";
import { http, urls } from "../../../../constants";

const { COOKIES } = http;

test("test storeRememberMeParams without cookie", () => {
  storeRememberMeParams();

  expect(localStorage.getItem(COOKIES.REMEMBER_ME)).toBeNull();
  expect(localStorage.getItem(COOKIES.USERNAME)).toBeNull();
});

test("test storeRememberMeParams with cookie", () => {
  Cookies.set(COOKIES.REMEMBER_ME, "true");
  Cookies.set(COOKIES.USERNAME, "123@mail.ru");

  storeRememberMeParams();
  expect(localStorage.getItem(COOKIES.REMEMBER_ME)).toBe("true");
  expect(localStorage.getItem(COOKIES.USERNAME)).toBe("123@mail.ru");
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

  expect(getPrevUrl("")).toBe(urls.main.path);
});
