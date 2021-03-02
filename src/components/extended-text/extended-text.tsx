import React, { ReactNode } from "react";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

type TextSizeType = "default" | "large" | "small";

interface ExtendedTextProps extends TextProps {
  size?: TextSizeType;
  children: ReactNode;
}

const FONT_SIZE_MAP: { [key: string]: string } = {
  default: "14px",
  large: "16px",
  small: "12px",
};

const ExtendedText = ({
  size = "default",
  children,
  style,
  ...props
}: ExtendedTextProps) => {
  const fontSize = FONT_SIZE_MAP[size];

  return (
    <Typography.Text style={{ fontSize, ...style }} {...props}>
      {children}
    </Typography.Text>
  );
};

export default ExtendedText;
