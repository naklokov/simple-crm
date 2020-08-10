import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";

import { getError } from "./utils";
import { useHistory } from "react-router";

interface ForbiddenProps {
  description: string;
}

export const Forbidden = ({ description }: ForbiddenProps) => {
  const [t] = useTranslation("error");
  const history = useHistory();
  const { errorDescription } = getError(history, t);

  return (
    <Result
      status="403"
      title={t("title.forbidden")}
      subTitle={description || t("subtitle.default")}
      extra={
        <Button type="primary" href="/">
          {t("button")}
        </Button>
      }
    />
  );
};

export default Error;
