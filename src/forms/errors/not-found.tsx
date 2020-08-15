import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { ROOT_URL } from "../../constants/http";

export const NotFound = () => {
  const [t] = useTranslation("error");

  return (
    <Result
      status="404"
      title={t("title.404")}
      subTitle={t("subtitle.default")}
      extra={
        <Button type="primary" href={ROOT_URL}>
          {t("button")}
        </Button>
      }
    />
  );
};

export default NotFound;
