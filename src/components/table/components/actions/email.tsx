import React, { useCallback } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";

interface EmailProps {
  mail: string;
  searched: string;
}

export const Email = ({ mail, searched }: EmailProps) => {
  const [t] = useTranslation("table");

  const handleCall = useCallback(() => {
    window.location.assign(`mailto:${mail}`);
  }, [mail]);

  return (
    <Popconfirm
      title={t("actions.email.confirm")}
      onConfirm={handleCall}
      okText={t("actions.email.yes")}
      cancelText={t("actions.email.no")}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        <HighlightTextWrapper text={mail} searched={searched} />
      </Button>
    </Popconfirm>
  );
};

export default Email;
