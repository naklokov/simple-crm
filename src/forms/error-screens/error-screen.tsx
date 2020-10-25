import React from "react";
import { ClientError, ServerError } from "./components";
import { http, ErrorAppState } from "../../constants";
import { useLocation } from "react-router";
import NotFoundScreen from "./not-found-screen";

const { HTTP_CODES } = http;

export const ErrorScreen = () => {
  const location = useLocation<{ error: ErrorAppState }>();
  const error = location?.state?.error ?? {};

  if (error.statusCode) {
    switch (error.statusCode) {
      case HTTP_CODES.BAD_REQUEST:
      case HTTP_CODES.FORBIDDEN:
        return <ClientError error={error} />;
      default:
        return <ServerError error={error} />;
    }
  }

  return <NotFoundScreen />;
};

export default ErrorScreen;
