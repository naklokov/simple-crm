import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { ErrorAppState } from "../../../../__data__/interfaces";
import { http } from "../../../../constants";

interface ServerErrorProps {
  error: ErrorAppState;
}

export const ServerError = ({ error }: ServerErrorProps) => {
  const [t] = useTranslation("error");
  const { errorDescription } = error;

  return (
    <Result
      status="500"
      title={t("title.server")}
      subTitle={errorDescription || t("subtitle.default")}
      extra={
        <Button type="primary" href={http.ROOT_URL}>
          {t("button")}
        </Button>
      }
    />
  );
};

export default ServerError;
