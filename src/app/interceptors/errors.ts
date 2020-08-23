import { http, ErrorProps } from "../../constants";
import { logger, logout, defaultErrorHandler } from "../../utils";
import { message } from "antd";
import { setError } from "../../__data__";
import { Dispatch } from "@reduxjs/toolkit";

const { ERROR_SCREEN_CODES, HTTP_CODES } = http;
const DEFAULT_ERROR_MESSAGE = "Произошла ошибка";

const {
  env: { NODE_ENV },
} = process;

interface ErrorResponceProps {
  config: any;
  response: {
    status: number;
    data: ErrorProps;
  };
}

export const errorsInterceptor = (dispatch: Dispatch) => (
  errorResponse: ErrorResponceProps
) => {
  try {
    let originalRequest = errorResponse.config;
    const statusCode = errorResponse?.response?.status;
    const error: ErrorProps = errorResponse?.response?.data ?? {};

    const { errorDescription = DEFAULT_ERROR_MESSAGE } = error;

    if (errorDescription) {
      logger.error({
        message: errorDescription,
      });
    }

    if (NODE_ENV === "development") {
      console.error(`[ERROR] Response with statusCode: ${statusCode}`, error);
    }

    if (statusCode === HTTP_CODES.UNAUTHORIZED) {
      if (errorDescription) {
        message.error(errorDescription);
      }
      logout(dispatch);
      return Promise.reject(errorResponse);
    }

    if (ERROR_SCREEN_CODES.includes(statusCode) && !originalRequest._retry) {
      if (statusCode === HTTP_CODES.NOT_FOUND) {
        dispatch(setError({ statusCode: HTTP_CODES.SERVER_ERROR }));
        return;
      }
      dispatch(setError({ statusCode, ...error }));
    }
    return Promise.reject(error);
  } catch (error) {
    defaultErrorHandler({ error, defaultErrorMessage: DEFAULT_ERROR_MESSAGE });
    Promise.reject(errorResponse);
  }
};
