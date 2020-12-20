import Cookies from "js-cookie";
import axios from "axios";
import { checkAuthCookie, isValuesChanged, logout } from "..";
import { COOKIES } from "../../constants/http";
import { urls } from "../../constants";

beforeEach(() => {
  Cookies.remove(COOKIES.JSESSIONID);
  Cookies.remove(COOKIES.REMEMBER_ME);
  Cookies.remove(COOKIES.USERNAME);
});

test("checkAuthCookie", () => {
  expect(checkAuthCookie()).toBe(false);

  Cookies.set(COOKIES.USERNAME, "asd");
  expect(checkAuthCookie()).toBe(false);

  Cookies.set(COOKIES.JSESSIONID, "123");
  expect(checkAuthCookie()).toBe(true);
});

xtest("logout", () => {
  const replaceSpy = jest.spyOn(location, "replace");
  const getSpy = jest.spyOn(axios, "get");
  const dispatchSpy = jest.fn();

  Cookies.set(COOKIES.REMEMBER_ME, "true");
  Cookies.set(COOKIES.JSESSIONID, "321");
  Cookies.set(COOKIES.USERNAME, "asd");
  expect(Cookies.get(COOKIES.USERNAME)).not.toBeUndefined();
  expect(Cookies.get(COOKIES.REMEMBER_ME)).not.toBeUndefined();
  expect(Cookies.get(COOKIES.JSESSIONID)).not.toBeUndefined();

  logout(dispatchSpy);

  expect(Cookies.get(COOKIES.USERNAME)).toBeUndefined();
  expect(Cookies.get(COOKIES.REMEMBER_ME)).toBeUndefined();
  expect(Cookies.get(COOKIES.JSESSIONID)).toBeUndefined();
  expect(getSpy).toHaveBeenCalledWith(urls.login.logout);
  expect(replaceSpy).toHaveBeenCalledWith(urls.main.path);
});
