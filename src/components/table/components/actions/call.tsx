import React, { useCallback } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";

interface CallProps {
  phone: string;
  searched: string;
}

export const Call = ({ phone, searched }: CallProps) => {
  const [t] = useTranslation("table");

  const handleCall = useCallback(() => {
    window.location.assign(`tel:${phone.replaceAll(/(\s|\(|\)|\-)/gi, "")}`);
  }, [phone]);

  return (
    <Popconfirm
      title={t("actions.call.confirm")}
      onConfirm={handleCall}
      okText={t("actions.call.yes")}
      cancelText={t("actions.call.no")}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        <HighlightTextWrapper text={phone} searched={searched} />
      </Button>
    </Popconfirm>
  );
};

export default Call;
