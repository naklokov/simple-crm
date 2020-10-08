import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

interface ReadonlyProps {
  value?: string;
  format?: (value: string) => string;
}

const DEFAULT_FORMAT = (value: string) => value;

export const Readonly = ({
  value = "",
  format = DEFAULT_FORMAT,
}: ReadonlyProps) => {
  const [t] = useTranslation("readonly");

  return (
    <Typography.Text>
      <strong>{format(value) || t("empty")}</strong>
    </Typography.Text>
  );
};
