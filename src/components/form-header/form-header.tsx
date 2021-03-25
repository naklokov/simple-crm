import React from "react";
import { PageHeader, PageHeaderProps } from "antd";
import { TabPositionType } from "../../constants";

interface FormHeaderProps extends PageHeaderProps {
  position?: TabPositionType;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  position = "upper",
  ...props
}) => {
  const style =
    position === "lower"
      ? {
          paddingTop: 0,
        }
      : {};

  return <PageHeader style={style} ghost={false} {...props} />;
};
