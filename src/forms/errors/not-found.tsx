import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const [t] = useTranslation("error");

  return (
    <Result
      status="404"
      title={t("title.404")}
      subTitle={t("subtitle.default")}
      extra={
        <Button type="primary" href="/">
          {t("button")}
        </Button>
      }
    />
  );
};

export default NotFound;
