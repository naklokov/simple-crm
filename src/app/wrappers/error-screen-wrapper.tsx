import React from "react";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";
import { ErrorAppState } from "../../__data__/interfaces";
import { HTTP_CODES } from "../../constants/http";
import { ForbiddenError, ServerError } from "../../forms";

interface ErrorHandlerProps {
  error: ErrorAppState;
  children: JSX.Element;
}

export const ErrorScreenWrapper = ({
  error: { statusCode } = {},
  children,
}: ErrorHandlerProps) => {
  if (statusCode) {
    switch (statusCode) {
      case HTTP_CODES.BAD_REQUEST:
      case HTTP_CODES.FORBIDDEN:
        return <ForbiddenError />;
      case HTTP_CODES.SERVER_ERROR:
        return <ServerError />;
    }
  }

  return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = (state: State) => ({
  error: state?.app?.error ?? {},
});

export default connect(mapStateToProps)(ErrorScreenWrapper);
