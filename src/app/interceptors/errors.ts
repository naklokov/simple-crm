import { ERROR_SCREEN_CODES } from "../../constants/http";
import { concatErrorPath } from "../../utils";

//TODO any type
export const errorsInterceptor = (error: any) => {
  let originalRequest = error.config;
  const statusCode = error?.response?.status;
  if (ERROR_SCREEN_CODES.includes(statusCode) && !originalRequest._retry) {
    window.location.replace(concatErrorPath(statusCode));
  }

  return Promise.reject(error);
};
