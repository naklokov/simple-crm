import Cookie from "js-cookie";
import { http } from "../../constants";
import { concatErrorPath, logger, logout } from "../../utils";
import { message } from "antd";

const { ERROR_SCREEN_CODES, HTTP_CODES } = http;

const {
  env: { NODE_ENV },
} = process;

// TODO any type
// рисовать ошибку при 401 вверху экрана
export const errorsInterceptor = (dispatch: Function) => (error: any) => {
  try {
    let originalRequest = error.config;
    const statusCode = error?.response?.status;

    if (NODE_ENV === "development") {
      console.error(
        `[ERROR] Response with statusCode: ${statusCode}`,
        error?.response?.data
      );
    }

    if (statusCode === HTTP_CODES.UNAUTHORIZED) {
      const errorDescription = error?.response?.data?.errorDescription;
      if (errorDescription) {
        message.error(errorDescription);
      }

      logout();
    }

    if (ERROR_SCREEN_CODES.includes(statusCode) && !originalRequest._retry) {
      // go to error page
      window.location.replace(concatErrorPath(statusCode));
    }
    return Promise.reject(error);
  } catch (error) {
    logger.error({
      message: error.message,
      username: Cookie.get("username"),
    });

    Promise.reject(error);
  }
};
