import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { urls, ErrorAppState } from "../../../../constants";

interface ClientErrorProps {
  error: ErrorAppState;
}

export const ClientError = ({ error }: ClientErrorProps) => {
  const [t] = useTranslation("error");
  const { errorDescription } = error;

  return (
    <Result
      status="403"
      title={t("title.forbidden")}
      subTitle={errorDescription || t("subtitle.default")}
      extra={
        <Button type="primary" href={urls.main.path}>
          {t("button")}
        </Button>
      }
    />
  );
};

export default ClientError;
