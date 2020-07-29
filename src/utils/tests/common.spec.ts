import Cookie from "js-cookie";
import { concatErrorPath, hasAuthCookie, logout } from "..";
import { COOKIES } from "../../constants/http";

beforeEach(() => {
  Cookie.remove(COOKIES.JSESSIONID);
  Cookie.remove(COOKIES.REMEMBER_ME);
  Cookie.remove(COOKIES.USERNAME);
});
test("concatErrorPath", () => {
  expect(concatErrorPath(403)).toBe("/errors/403");
  expect(concatErrorPath(400)).toBe("/errors/400");
});

test("hasAuthCookie", () => {
  expect(hasAuthCookie()).toBe(false);

  Cookie.set(COOKIES.USERNAME, "asd");
  expect(hasAuthCookie()).toBe(false);

  Cookie.set(COOKIES.JSESSIONID, "123");
  expect(hasAuthCookie()).toBe(true);
});

test("logout", () => {
  const replaceSpy = jest.spyOn(location, "replace");

  Cookie.set(COOKIES.REMEMBER_ME, "true");
  Cookie.set(COOKIES.JSESSIONID, "321");
  Cookie.set(COOKIES.USERNAME, "asd");
  expect(Cookie.get(COOKIES.USERNAME)).not.toBeUndefined();
  expect(Cookie.get(COOKIES.REMEMBER_ME)).not.toBeUndefined();
  expect(Cookie.get(COOKIES.JSESSIONID)).not.toBeUndefined();

  logout();

  expect(Cookie.get(COOKIES.USERNAME)).toBeUndefined();
  expect(Cookie.get(COOKIES.REMEMBER_ME)).toBeUndefined();
  expect(Cookie.get(COOKIES.JSESSIONID)).toBeUndefined();
  expect(replaceSpy).toHaveBeenCalledWith("/");
});
