import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { noop, isNil } from "lodash";

const { Link, Paragraph } = Typography;

interface ReadonlyProps {
  value?: any;
  format?: (value: any) => string;
  type?: "href" | "text";
  onClickLink?: () => void;
}

const DEFAULT_FORMAT = (value: string | boolean) => value.toString();

export const Readonly: React.FC<ReadonlyProps> = ({
  value = "",
  format = DEFAULT_FORMAT,
  onClickLink = noop,
  type = "text",
}) => {
  const [t] = useTranslation("readonly");

  if (type === "href" && value) {
    return (
      <Link onClick={onClickLink}>
        <strong>{format(value)}</strong>
      </Link>
    );
  }

  const isFilledValue = value || value === false

  console.log('isFilledValue', isFilledValue);

  return (
    <Paragraph
      style={{ marginBottom: 0 }}
      strong
      ellipsis={{ rows: 2, expandable: true }}
    >
      {isFilledValue ? format(value) : t("empty")}
    </Paragraph>
  );
}

