import { http, urls } from "../constants";
import axios from "axios";
import Cookie from "js-cookie";
import { logger } from ".";

const { COOKIES } = http;

export const hasAuthCookie = () =>
  !!Cookie.get(COOKIES.USERNAME) && !!Cookie.get(COOKIES.JSESSIONID);

export const logout = () => {
  const username = Cookie.get(COOKIES.USERNAME);
  Cookie.remove(COOKIES.USERNAME);
  Cookie.remove(COOKIES.JSESSIONID);
  Cookie.remove(COOKIES.REMEMBER_ME);

  try {
    axios.get(urls.login.logout);
    window.location.replace("/");
  } catch (error) {
    logger.error({ username, message: error.message });
  }
};

export const concatErrorPath = (code: string | number = ":code") =>
  `${urls.error.path}/${code.toString()}`;
