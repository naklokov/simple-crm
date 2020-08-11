import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { ErrorProps } from "../../constants";
import { State, ErrorAppState } from "../../__data__/interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { setError as setErrorAction } from "../../__data__";

interface ForbiddenProps {
  error: ErrorAppState;
  setError: (error: {}) => void;
}

export const Forbidden = ({ error, setError }: ForbiddenProps) => {
  const [t] = useTranslation("error");
  const { errorDescription } = error;

  return (
    <Result
      status="403"
      title={t("title.forbidden")}
      subTitle={errorDescription || t("subtitle.default")}
      extra={
        <Button type="primary" href="/">
          {t("button")}
        </Button>
      }
    />
  );
};

const mapStateToProps = (state: State) => ({
  error: state?.app?.error ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setError: (error: {}) => dispatch(setErrorAction(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forbidden);
