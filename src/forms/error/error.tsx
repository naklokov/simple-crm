import React from "react";
import { Result } from "antd";
import { useTranslation } from "react-i18next";

import { getErrorInfo } from "./utils";
import { useParams, useHistory } from "react-router";

const getErrorMessage = (history: any, t: Function) =>
  history?.location?.state?.username || t("subtitle.default");

interface ErrorProps {
  code?: number;
  message?: string;
}

export const Error = () => {
  const [t] = useTranslation("error");
  const history = useHistory();
  const { code } = useParams();
  const { status, title } = getErrorInfo(+code, t);

  return (
    <Result
      status={status}
      title={title}
      subTitle={getErrorMessage(history, t)}
    />
  );
};

export default Error;
