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
  localStorage.clear();

  try {
    axios.get(urls.login.logout);
    window.location.replace("/");
    logger.debug({ message: "Пользователь вышел из системы", username });
  } catch (error) {
    logger.error({ message: error.message, username });
  }
};

export const concatErrorPath = (code: string | number = ":code") =>
  `${urls.error.path}/${code.toString()}`;
