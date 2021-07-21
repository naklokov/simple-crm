import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { noop } from "lodash";

const { Link, Paragraph } = Typography;

interface ReadonlyProps {
  value?: any;
  format?: (value: any) => string;
  type?: "href" | "text";
  onClickLink?: () => void;
}

const DEFAULT_FORMAT = (value: any) => value.toString();

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

  return (
    <Paragraph
      style={{ marginBottom: 0 }}
      strong
      ellipsis={{ rows: 2, expandable: true }}
    >
      {value || value === false ? format(value) : t("empty")}
    </Paragraph>
  );
};
