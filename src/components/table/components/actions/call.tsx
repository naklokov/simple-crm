import React, { useCallback } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

interface CallProps {
  phone: string;
}

export const Call = ({ phone }: CallProps) => {
  const [t] = useTranslation("table");

  const handleCall = useCallback(() => {
    alert(`Звонок на номер ${phone}`);
  }, []);

  return (
    <Popconfirm
      title={t("actions.call.confirm")}
      onConfirm={handleCall}
      okText={t("actions.call.yes")}
      cancelText={t("actions.call.no")}
      placement="left"
    >
      <Button style={{ padding: 0 }} type="link">
        {phone}
      </Button>
    </Popconfirm>
  );
};

export default Call;
