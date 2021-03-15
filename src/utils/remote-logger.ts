import axios from "axios";
import Cookie from "js-cookie";
import urls from "../constants/urls";
import { COOKIES } from "../constants/http";

const usernameFromCookie = Cookie.get(COOKIES.USERNAME);

export const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

enum LogLevelsEnum {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

interface LoggerProps {
  message: string;
  username?: string;
  value?: string | number;
  url?: string;
  method?: string;
}

export const getFullMessage = ({
  message,
  value,
  method,
  url,
  username = usernameFromCookie,
}: LoggerProps) => {
  const fullMessageArgs = [
    message,
    value,
    method?.toUpperCase(),
    url,
    username,
  ];

  return fullMessageArgs.filter((o) => !!o).join(" | ");
};

const sendRemote = (
  message: string,
  logLevel: LogLevelsEnum = LogLevelsEnum.ERROR
) => {
  axios.post(
    urls.log.base,
    { message, logLevel },
    {
      headers: HEADERS,
    }
  );
};

export const error = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.ERROR;
  const fullMessage = getFullMessage(props);

  // eslint-disable-next-line
  console.error(fullMessage);
  sendRemote(fullMessage, logLevel);
};

export const warn = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.WARNING;
  const fullMessage = getFullMessage(props);

  // eslint-disable-next-line
  console.warn(fullMessage);
  sendRemote(fullMessage, logLevel);
};

export const debug = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.DEBUG;
  const fullMessage = getFullMessage(props);

  sendRemote(fullMessage, logLevel);
};
