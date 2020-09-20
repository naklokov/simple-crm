import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export const NotFoundScreen = () => {
  const [t] = useTranslation("error");
  const history = useHistory();

  return (
    <Result
      status="404"
      title={t("title.404")}
      subTitle={t("subtitle.default")}
      extra={
        <Button type="primary" onClick={history.goBack}>
          {t("button.go.back")}
        </Button>
      }
    />
  );
};

export default NotFoundScreen;
