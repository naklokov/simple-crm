import React, { useCallback } from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export const NotFoundScreen = () => {
  const [t] = useTranslation("error");
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  return (
    <Result
      status="404"
      title={t("title.404")}
      subTitle={t("subtitle.default")}
      extra={
        <Button type="primary" onClick={handleGoBack}>
          {t("button.go.back")}
        </Button>
      }
    />
  );
};
