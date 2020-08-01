import axios from "axios";
import { urls } from "../constants";

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
}

export const getFullMessage = ({ message, value, username }: LoggerProps) => {
  let fullMessage = message;

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
      headers: HEADERS,
    }
  );
};

export const error = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.ERROR;
  const fullMessage = getFullMessage(props);

  console.error(fullMessage);
  sendRemote(fullMessage, logLevel);
};

export const warn = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.WARNING;
  const fullMessage = getFullMessage(props);

  console.warn(fullMessage);
  sendRemote(fullMessage, logLevel);
};

export const debug = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.DEBUG;
  const fullMessage = getFullMessage(props);

  sendRemote(fullMessage, logLevel);
};
