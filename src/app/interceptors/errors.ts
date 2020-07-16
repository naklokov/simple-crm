import { ERROR_SCREEN_CODES, HTTP_CODES } from "../../constants/http";
import { concatErrorPath, logger } from "../../utils";
import { setAuth, setLoading } from "../../__data__";
import Cookie from "js-cookie";

const {
  env: { NODE_ENV },
} = process;

//TODO any type
export const errorsInterceptor = (dispatch: Function) => (error: any) => {
  let originalRequest = error.config;
  const statusCode = error?.response?.status;

  if (NODE_ENV === "development") {
    console.error(
      `[ERROR] Responce with statusCode: ${statusCode}`,
      error?.responce?.data
    );
  }

  if (statusCode === HTTP_CODES.UNAUTHORIZED) {
    dispatch(setAuth(false));
    // go to login page
    window.location.replace("/");
  }

  if (ERROR_SCREEN_CODES.includes(statusCode) && !originalRequest._retry) {
    // go to error page
    window.location.replace(concatErrorPath(statusCode));
  }

  logger.error({
    message: error?.responce?.data?.errorDescription,
    value: error?.responce?.data?.errorCode,
    username: Cookie.get("username"),
  });

  return Promise.reject(error);
};
