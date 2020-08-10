import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";

import { getError } from "./utils";
import { useHistory } from "react-router";

interface ServerErrorProps {
  description: string;
}

export const ServerError = ({ description }: ServerErrorProps) => {
  const [t] = useTranslation("error");
  const history = useHistory();
  const { errorDescription } = getError(history, t);

  return (
    <Result
      status="500"
      title={t("title.server")}
      subTitle={errorDescription || t("subtitle.default")}
      extra={
        <Button type="primary" href="/">
          {t("button")}
        </Button>
      }
    />
  );
};

export default Error;
