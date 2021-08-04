import React from "react";
import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { VALIDATION_COLOR, ValidationTooltipProps } from "../../constants";

export const ValidationTooltip: React.FC<ValidationTooltipProps> = ({
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
          <span>{message}</span>
          {href.map((x) => (
            <a
              key={x?.url}
              href={x?.url}
              style={{ display: "block" }}
              target={x?.external ? "_blank" : ""}
              rel="noreferrer"
            >
              {x?.text}
            </a>
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
      {validationIcon?.[messageType]}
    </Popover>
  );
};
