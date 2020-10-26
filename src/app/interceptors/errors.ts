import { http, ErrorProps, State, ErrorAppState } from "../../constants";
import { logger, logout, defaultErrorHandler } from "../../utils";
import { setError } from "../../__data__";
import { Dispatch } from "@reduxjs/toolkit";

const { ERROR_SCREEN_CODES, HTTP_CODES } = http;
const DEFAULT_ERROR_MESSAGE = "Произошла ошибка";

const {
  env: { NODE_ENV },
} = require("process");

interface ErrorResponceProps {
  config: any;
  response: {
    status: number;
    data: ErrorProps;
  };
}

export const errorsInterceptor = (
  dispatch: Dispatch,
  errorStore: ErrorAppState
) => (errorResponse: ErrorResponceProps) => {
  try {
    let originalRequest = errorResponse.config;
    const statusCode = errorResponse?.response?.status;
    const error: ErrorProps = errorResponse?.response?.data ?? {};

    if (NODE_ENV === "development") {
      console.error(`[ERROR] Response with statusCode: ${statusCode}`, error);
    }

    if (statusCode === HTTP_CODES.UNAUTHORIZED) {
      logout(dispatch);
      return Promise.reject(errorResponse);
    }

    const hasError = errorStore?.statusCode;
    if (ERROR_SCREEN_CODES.includes(statusCode) && !originalRequest._retry) {
      if (!hasError) {
        dispatch(setError({ statusCode, ...error }));
      }
    }
    return Promise.reject(error);
  } catch (error) {
    defaultErrorHandler({ error, defaultErrorMessage: DEFAULT_ERROR_MESSAGE });
    return Promise.reject(errorResponse);
  }
};
