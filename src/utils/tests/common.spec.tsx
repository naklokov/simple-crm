import Cookies from "js-cookie";
import axios from "axios";
import { checkAuthCookie, isValuesChanged, logout } from "..";
import { COOKIES } from "../../constants/http";
import { urls } from "../../constants";
import {
  callTel,
  clearCookie,
  fillTemplate,
  getDateWithTimezone,
  getFullUrl,
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

  expect(Cookies.get(COOKIES.USERNAME)).toBe(void 0);
  expect(Cookies.get(COOKIES.JSESSIONID)).toBe(void 0);
  expect(Cookies.get(COOKIES.REMEMBER_ME)).toBe(void 0);
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
    getAction("data/setActiveTasks", [])
  );

  expect(dispatchSpy).toHaveBeenNthCalledWith(
    5,
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

xtest("getDateWithTimezone", () => {
  const dateWithoutTimezone = "2011-02-01T15:00:00";
  expect(getDateWithTimezone(dateWithoutTimezone)).toBe("2011-02-01T18:00:00");
});
