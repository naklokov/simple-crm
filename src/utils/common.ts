import { http, urls } from "../constants";
import Cookie from "js-cookie";

const { COOKIES } = http;

export const hasAuthCookie = () =>
  !!Cookie.get(COOKIES.USERNAME) && !!Cookie.get(COOKIES.JSESSIONID);

export const logout = () => {
  Cookie.remove(COOKIES.USERNAME);
  Cookie.remove(COOKIES.JSESSIONID);
  Cookie.remove(COOKIES.REMEMBER_ME);

  window.location.replace("/");
};

export const concatErrorPath = (code: string | number = ":code") =>
  `${urls.error.path}/${code.toString()}`;
