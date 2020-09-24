import React, { useCallback } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";
import { callTel } from "../../../../utils";

interface CallProps {
  phone: string;
  searched: string;
}

export const Call = ({ phone, searched }: CallProps) => {
  const [t] = useTranslation("table");

  const handleCall = useCallback(() => {
    callTel(phone);
  }, [phone]);

  return (
    <Popconfirm
      title={t("actions.call.confirm")}
      onConfirm={handleCall}
      placement="left"
      key={phone}
    >
      <Button key={phone} style={{ padding: 0 }} type="link">
        <HighlightTextWrapper key={phone} text={phone} searched={searched} />
      </Button>
    </Popconfirm>
  );
};

export default Call;
