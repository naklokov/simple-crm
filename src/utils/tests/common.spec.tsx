import Cookies from "js-cookie";
import axios from "axios";
import { checkAuthCookie, logout } from "..";
import { COOKIES } from "../../constants/http";
import { DATE_FORMATS, urls } from "../../constants";
import {
  callTel,
  clearCookie,
  fillTemplate,
  getDateWithTimezone,
  getFullUrl,
  pluralize,
} from "../common";

const getAction = (type: string, payload: any) => ({
  type,
  payload,
});

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

test("clearCookie", () => {
  Cookies.set(COOKIES.USERNAME, "asd");
  Cookies.set(COOKIES.JSESSIONID, "123");
  Cookies.set(COOKIES.REMEMBER_ME, "true");

  clearCookie();

  expect(Cookies.get(COOKIES.USERNAME)).toBe(undefined);
  expect(Cookies.get(COOKIES.JSESSIONID)).toBe(undefined);
  expect(Cookies.get(COOKIES.REMEMBER_ME)).toBe(undefined);
});

test("logout", () => {
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

  // clear redux store
  expect(dispatchSpy).toHaveBeenNthCalledWith(
    1,
    getAction("data/setClients", [])
  );
  expect(dispatchSpy).toHaveBeenNthCalledWith(
    2,
    getAction("data/setProfileInfo", {})
  );
  expect(dispatchSpy).toHaveBeenNthCalledWith(
    3,
    getAction("persist/setPermissions", [])
  );

  expect(dispatchSpy).toHaveBeenNthCalledWith(
    4,
    getAction("app/setLoading", true)
  );
});

test("fillTemplate", () => {
  const template = "Имеем {{count}} трубы и {{color}} зубы";

  expect(fillTemplate(template, { count: 3, color: "желтые" })).toBe(
    "Имеем 3 трубы и желтые зубы"
  );

  expect(
    fillTemplate(template, { count: 3, color: "желтые", left: "asd" })
  ).toBe("Имеем 3 трубы и желтые зубы");
});

test("getFullUrl", () => {
  expect(getFullUrl("/users", "name1")).toBe("/users/name1");
  expect(getFullUrl("/users")).toBe("/users");
});

test("callTel", () => {
  const assignSpy = jest.spyOn(window.location, "assign");
  const phone = "+7 (888) 999-66-55";
  const phoneWithCode = "+7 (888) 999-66-55, 2211";

  callTel(phone);
  callTel(phoneWithCode);

  expect(assignSpy).toHaveBeenNthCalledWith(1, "tel:+78889996655");
  expect(assignSpy).toHaveBeenNthCalledWith(2, "tel:+78889996655,2211");
});

test("getDateWithTimezone", () => {
  const dateWithoutTimezone = "2021-02-04T23:00:19.172";
  expect(
    getDateWithTimezone(dateWithoutTimezone).format(DATE_FORMATS.DATE_TIME)
  ).toBe("05.02.2021 02:00");
});

test("pluralize", () => {
  const one = "арбуз";
  const some = "арбуза";
  const many = "арбузов";
  const vars = [one, some, many];

  expect(pluralize(1, vars)).toBe(one);
  expect(pluralize(101, vars)).toBe(one);
  expect(pluralize(2, vars)).toBe(some);
  expect(pluralize(102, vars)).toBe(some);
  expect(pluralize(10, vars)).toBe(many);
  expect(pluralize(100, vars)).toBe(many);
});
