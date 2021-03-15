import { Dispatch } from "@reduxjs/toolkit";
import { http, ErrorProps, ErrorAppState } from "../../constants";
import { logout, defaultErrorHandler } from "../../utils";
import { setError } from "../../__data__";

const { ERROR_SCREEN_CODES, HTTP_CODES } = http;
const DEFAULT_ERROR_MESSAGE = "Произошла ошибка";

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
    const { _retry: retry, method, url } = errorResponse?.config ?? {};
    const statusCode = errorResponse?.response?.status;
    const errorInfo: ErrorProps = errorResponse?.response?.data ?? {};
    const error = { ...errorInfo, url, method };

    if (statusCode === HTTP_CODES.UNAUTHORIZED) {
      logout(dispatch);
      return Promise.reject(error);
    }

    const hasError = errorStore?.statusCode;
    if (ERROR_SCREEN_CODES.includes(statusCode) && !retry) {
      if (!hasError) {
        dispatch(setError({ statusCode, ...error }));
      }
    }
    return Promise.reject(error);
  } catch (error) {
    defaultErrorHandler({ error, defaultErrorMessage: DEFAULT_ERROR_MESSAGE });
    return Promise.reject(error);
  }
};
