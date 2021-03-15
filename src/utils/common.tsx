import React from "react";
import axios from "axios";
import moment from "moment-timezone";
import Cookies from "js-cookie";
import { Dispatch } from "@reduxjs/toolkit";
import { message } from "antd";
import { Link } from "react-router-dom";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import {
  setAuth,
  setClients,
  setLoading,
  setPermissions,
  setProfileInfo,
} from "../__data__";
import { COOKIES } from "../constants/http";
import { logger } from "./index";

import { urls, ErrorProps, ClientEntityProps } from "../constants";

interface DefaultErrorHandlerProps {
  error: ErrorProps;
  username?: string;
  defaultErrorMessage?: string;
}

const FULL_ERROR_MESSAGE_CODES = ["OLVE-7"];

const DEFAULT_SUCCESS_MESSAGE_LOGOUT = "Пользователь вышел из системы";
const DEFAULT_ERROR_MESSAGE_LOGOUT =
  "Произошла ошибка в процессе выхода из системы";

const clearReduxStore = (dispatch: Dispatch) => {
  dispatch(setClients([]));
  dispatch(setProfileInfo({}));
  dispatch(setPermissions([]));
};

export const checkAuthCookie = () =>
  !!Cookies.get(COOKIES.USERNAME) && !!Cookies.get(COOKIES.JSESSIONID);

export const clearCookie = () => {
  Cookies.remove(COOKIES.USERNAME);
  Cookies.remove(COOKIES.JSESSIONID);
  Cookies.remove(COOKIES.REMEMBER_ME);
};

export const logout = async (dispatch: Dispatch) => {
  const username = Cookies.get(COOKIES.USERNAME);
  clearReduxStore(dispatch);
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

export const FormContext = React.createContext<any>("");

export const ClientsPersonalContext = React.createContext<ClientEntityProps[]>(
  []
);

const getTemplateMask = (param: string) => `{{${param}}}`;

export const fillTemplate = (
  template: string,
  values?: { [key: string]: string | number }
) => {
  let result = template;
  if (values) {
    const keys = Object.keys(values);

    keys.forEach((key) => {
      result = result.replace(getTemplateMask(key), values[key].toString());
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
  window.location.assign(`tel:${phone.replace(/(\s|\(|\)|-)/gi, "")}`);
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
    errorCode = "",
    errorDescription = defaultErrorMessage,
    errorMessage,
    method,
    url,
  } = error;

  const fullMessage = errorMessage
    ? `${errorDescription}: ${errorMessage}`
    : errorDescription;

  logger.error({
    value: errorCode,
    message: fullMessage,
    username,
    url,
    method,
  });

  if (errorDescription) {
    if (FULL_ERROR_MESSAGE_CODES.includes(errorCode)) {
      message.error(fullMessage);
      return;
    }
    message.error(errorMessage);
  }
};

export const getDateWithTimezone = (date?: string) => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return moment.utc(date).tz(tz);
};

export const getItemRender = (
  route: Route,
  params: any,
  routes: Array<Route>,
  paths: Array<string>
) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span key={route.path}>{route.breadcrumbName}</span>
  ) : (
    <Link key={route.path} to={`/${paths.join("/")}`}>
      {route.breadcrumbName}
    </Link>
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

export const openUrlTargetBlank = (url: string) => {
  const win = window.open(url, "_blank");
  win?.focus();
};

export const checkMobile = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
};

/**
 * Метод склонения существительного в зависимости от числа
 * @param count Число для склонения
 * @param text_forms Набор склонений [one, some, many]
 */
export const pluralize = (count: number, vars: string[]) => {
  const number = Math.abs(count) % 100;
  const n1 = number % 10;
  if (count > 10 && count < 20) {
    return vars[2];
  }
  if (n1 > 1 && n1 < 5) {
    return vars[1];
  }
  if (n1 == 1) {
    return vars[0];
  }

  return vars[2];
};

/**
 * Метод записи переменной в буфер обмена
 * @param str Значение копируемое в буфер обмена
 */
export const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
