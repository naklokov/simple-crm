import axios from "axios";
import { urls } from "../constants";

enum LogLevelsEnum {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

interface LoggerProps {
  message: string;
  username?: string;
  value?: string;
}

const getFullMessage = ({ message, value, username }: LoggerProps) => {
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
      headers: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    }
  );
};

const error = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.ERROR;
  const fullMessage = getFullMessage(props);

  sendRemote(fullMessage, logLevel);
};

const warn = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.WARNING;
  const fullMessage = getFullMessage(props);

  sendRemote(fullMessage, logLevel);
};

const info = (props: LoggerProps) => {
  const logLevel = LogLevelsEnum.INFO;
  const fullMessage = getFullMessage(props);

  sendRemote(fullMessage, logLevel);
};

export default { info, warn, error };
