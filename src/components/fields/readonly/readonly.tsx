import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { noop } from "lodash";

interface ReadonlyProps {
  value?: string;
  format?: (value: string) => string;
  type?: "href" | "text";
  onClickLink?: () => void;
}

const DEFAULT_FORMAT = (value: string) => value;

const { Link, Text } = Typography;

export const Readonly = ({
  value = "",
  format = DEFAULT_FORMAT,
  onClickLink = noop,
  type = "text",
}: ReadonlyProps) => {
  const [t] = useTranslation("readonly");

  if (type === "href") {
    return (
      <Link onClick={onClickLink}>
        <strong>{format(value)}</strong>
      </Link>
    );
  }

  return (
    <Text>
      <strong>{format(value) || t("empty")}</strong>
    </Text>
  );
};
