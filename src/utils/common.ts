import Cookie from "js-cookie";
import { http, urls } from "../constants";

const { AUTH_COOKIE_SESSION, AUTH_COOKIE_USERNAME, HTTP_CODES } = http;

export const concatErrorPath = (code: string | number = ":code") =>
  `${urls.error.path}/${code.toString()}`;

export const isAuth = () =>
  !!Cookie.get(AUTH_COOKIE_SESSION) && !!Cookie.get(AUTH_COOKIE_USERNAME);
