import axios from "axios";
import dayjs from "dayjs";

import { urls } from "../constants";

enum LogLevelsEnum {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

const baseInfo = console.info;
const baseWarn = console.warn;
const baseError = console.error;

const getFullMessage = (
  message: string,
  value: string | number,
  username: string,
  logLevel: string = LogLevelsEnum.ERROR
) => {
  const dateTime = dayjs().format("DD:MM:YYYY HH:mm:ss");
  let fullMessage = `[${dateTime}] ${logLevel} | ${message}`;

  if (value) {
    fullMessage += ` ${value}`;
  }

  if (username) {
    fullMessage += ` (${username})`;
  }

  return fullMessage;
};

const sendRemote = (
  message: string,
  logLevel: LogLevelsEnum = LogLevelsEnum.ERROR
) => {
  axios.post(
    urls.log.base,
    { message, logLevel },
    {
      headers: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    }
  );
};

console.error = (
  message: string = "",
  username: string = "",
  value: string | number = ""
) => {
  const fullMessage = getFullMessage(message, value, username);

  sendRemote(fullMessage);
  baseError(message, value, username);
};

console.warn = (
  message: string = "",
  username: string = "",
  value: string | number = ""
) => {
  const logLevel = LogLevelsEnum.WARNING;
  const fullMessage = getFullMessage(message, value, username, logLevel);

  sendRemote(fullMessage, logLevel);
  baseWarn(message, value, username);
};

console.info = (
  message: string = "",
  username: string = "",
  value: string | number = ""
) => {
  const logLevel = LogLevelsEnum.INFO;
  const fullMessage = getFullMessage(message, value, username, logLevel);

  sendRemote(fullMessage, logLevel);
  baseInfo(message, value, username);
};
