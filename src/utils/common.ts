import { urls, ErrorProps } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { logger } from ".";
import http, { COOKIES } from "../constants/http";
import { Dispatch } from "@reduxjs/toolkit";
import { setAuth, setLoading } from "../__data__";
import { message } from "antd";
import { ProfileInfoProps } from "../__data__/interfaces";

interface DefaultErrorHandlerProps {
  error: ErrorProps;
  username?: string;
  defaultErrorMessage?: string;
}

const DEFAULT_SUCCESS_MESSAGE_LOGOUT = "Пользователь вышел из системы";
const DEFAULT_ERROR_MESSAGE_LOGOUT =
  "Произошла ошибка в процессе выхода из системы";

export const checkAuthCookie = () =>
  !!Cookies.get(COOKIES.USERNAME) && !!Cookies.get(COOKIES.JSESSIONID);

export const clearCookie = () => {
  Cookies.remove(COOKIES.USERNAME);
  Cookies.remove(COOKIES.JSESSIONID);
  Cookies.remove(COOKIES.REMEMBER_ME);
};

const getTemplateMask = (param: string) => `{{${param}}}`;

export const fillTemplate = (
  template: string,
  values?: { [key: string]: string }
) => {
  let result = template;
  if (values) {
    const keys = Object.keys(values);

    keys.forEach((key) => {
      result = result.replace(getTemplateMask(key), values[key]);
    });
  }

  return result;
};

export const getFullName = (profileInfo: ProfileInfoProps) =>
  `${profileInfo.lastName} ${profileInfo.firstName} ${profileInfo.secondName}`;

export const getFullUrl = (url: string = "", id?: string): string => {
  if (id) {
    return `${url}/${id}`;
  }

  return url;
};

export const logout = async (dispatch: Dispatch) => {
  const username = Cookies.get(COOKIES.USERNAME);
  clearCookie();
  localStorage.clear();

  try {
    dispatch(setLoading(true));
    await axios.get(urls.login.logout);
    logger.debug({ message: DEFAULT_SUCCESS_MESSAGE_LOGOUT, username });
  } catch (error) {
    defaultErrorHandler({
      error,
      defaultErrorMessage: DEFAULT_ERROR_MESSAGE_LOGOUT,
      username,
    });
  } finally {
    dispatch(setAuth(false));
    dispatch(setLoading(false));
  }
};

export const defaultSuccessHandler = (messageSuccess: string) => {
  logger.debug({ message: messageSuccess });
  message.success(messageSuccess);
};

export const defaultErrorHandler = ({
  error,
  username = Cookies.get(COOKIES.USERNAME),
  defaultErrorMessage = "",
}: DefaultErrorHandlerProps) => {
  const {
    errorCode,
    errorDescription,
    errorMessage = defaultErrorMessage,
  } = error;

  const fullMessage = errorDescription
    ? `${errorMessage}: ${errorDescription}`
    : errorMessage;

  logger.error({
    value: errorCode,
    message: fullMessage,
    username,
  });

  if (errorDescription) {
    message.error(errorDescription);
  }
};
