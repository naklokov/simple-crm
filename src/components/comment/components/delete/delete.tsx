import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";

export const Delete = ({ onDelete }: { onDelete: () => void }) => {
  const [t] = useTranslation("comment");

  return (
    <Popconfirm
      title={t("delete.confirm")}
      onConfirm={onDelete}
      okText={t("delete.yes")}
      cancelText={t("delete.no")}
      placement="topLeft"
    >
      <span>{t("button.delete")}</span>
    </Popconfirm>
  );
};

export default Delete;
