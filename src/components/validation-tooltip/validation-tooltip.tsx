import React from "react";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Popover, Typography } from "antd";
import { VALIDATION_COLOR, ValidationTooltipProps } from "../../constants";

const ValidationTooltip: React.FC<ValidationTooltipProps> = ({
  messageType,
  title,
  message,
  href,
}) => {
  const validationIcon = {
    info: <InfoCircleOutlined style={{ color: VALIDATION_COLOR.info }} />,
    warning: <WarningOutlined style={{ color: VALIDATION_COLOR.warning }} />,
    error: <CloseCircleOutlined style={{ color: VALIDATION_COLOR.error }} />,
  };

  return (
    <Popover
      content={
        <div style={{ maxWidth: 250 }}>
          <h4>{title}</h4>
          <div>{message}</div>
          {href?.map((link) => (
            <Typography.Link
              href={link?.url}
              key={link?.url}
              target={link?.external ? "_blank" : ""}
            >
              {link?.text}
            </Typography.Link>
          ))}
        </div>
      }
      placement="bottomRight"
      arrowPointAtCenter
      overlayInnerStyle={{
        borderRadius: 10,
        padding: 0,
        margin: 0,
      }}
    >
      {messageType && validationIcon?.[messageType]}
    </Popover>
  );
};

export default ValidationTooltip;
