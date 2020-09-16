import React from "react";
import { urls, ErrorProps, RSQL_OPERATORS_MAP } from "../constants";
import axios from "axios";
import moment from "moment-timezone";
import Cookies from "js-cookie";
import { logger } from ".";
import { COOKIES } from "../constants/http";
import { Dispatch } from "@reduxjs/toolkit";
import { setAuth, setLoading } from "../__data__";
import { message } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { Link } from "react-router-dom";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";

interface RsqlParamProps {
  key: string;
  operator?: string;
  value: string | number | boolean;
}

interface DefaultErrorHandlerProps {
  error: ErrorProps;
  username?: string;
  defaultErrorMessage?: string;
}

const ORDER_MAP = {
  ascend: "asc",
  descend: "desc",
};

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

// export const getRsqlQuery = (params: QueryParamsType) => {
//   const keys = Object.keys(params);
//   const query = keys.reduce(
//     (prev, key) => prev + `${key}==${params[key]};`,
//     ""
//   );

//   // удаляем последнюю точку с запятой
//   return { query: query.substring(0, query.length - 1) };
// };

export const getRsqlQuery = (params: RsqlParamProps[]) => {
  const queries = params.map(
    ({ key, value, operator = RSQL_OPERATORS_MAP.EQUAL }) =>
      `${key}${operator}${value}`
  );

  return { query: queries.join(";") };
};

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

export const getFullUrl = (url: string = "", id?: string): string => {
  if (id) {
    return `${url}/${id}`;
  }

  return url;
};

export const callTel = (phone: string) => {
  window.location.assign(`tel:${phone.replaceAll(/(\s|\(|\)|\-)/gi, "")}`);
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

export const getDateWithTimezone = (date: string) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return moment.utc(date).tz(tz);
};

export const getSortedParams = ({
  field,
  order,
}: {
  field: string;
  order: SortOrder;
}) => {
  if (order) {
    return `${field}:${ORDER_MAP[order]}`;
  }

  return "";
};

export const getItemRender = (
  route: Route,
  params: any,
  routes: Array<Route>,
  paths: Array<string>
) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join("/")}`}>{route.breadcrumbName}</Link>
  );
};

export const handlePressEnter = (
  e: React.KeyboardEvent,
  callback: () => void
) => {
  if (e.key === "Enter" && !e.shiftKey) {
    callback();
    e.preventDefault();
  }
};
