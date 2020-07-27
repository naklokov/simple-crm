import { http, urls } from "../constants";
import Cookie from "js-cookie";

const { COOKIES } = http;

export const hasAuthCookie = () =>
  Cookie.get(COOKIES.USERNAME) && Cookie.get(COOKIES.JSESSIONID);

export const concatErrorPath = (code: string | number = ":code") =>
  `${urls.error.path}/${code.toString()}`;
