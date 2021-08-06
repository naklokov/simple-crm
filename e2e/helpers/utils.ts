import { ClientFunction } from "testcafe";
import { COOKIES } from "../../src/constants/http";

const Cookies = require("js-cookie");

export const clearAuthCookies = ClientFunction(() => {
  Cookies.remove(COOKIES.JSESSIONID);
  Cookies.remove(COOKIES.USERNAME);
  Cookies.remove(COOKIES.REMEMBER_ME);
});

export const createClient = () => ClientFunction(() => {});
