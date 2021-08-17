import React from "react";
import { Popover, Typography } from "antd";
import { validationIcons, ValidationIconProps } from "../../constants";
import { encodeURIChars } from "../../utils";

const ValidationIcon: React.FC<ValidationIconProps> = ({
  messageType,
  title,
  message,
  href,
}) => {
  const { Text, Link } = Typography;

  return messageType ? (
    <Popover
      content={
        <div style={{ maxWidth: 250 }}>
          <Text style={{ display: "block" }} strong>
            {title}
          </Text>
          <Text style={{ display: "block" }}>{message}</Text>
          {href?.map((link) => (
            <Link
              style={{ display: "block" }}
              href={encodeURIChars(link?.url)}
              key={link?.url}
              target={link?.external ? "_blank" : ""}
            >
              {link?.text}
            </Link>
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
      {validationIcons.get(messageType).icon}
    </Popover>
  ) : null;
};

export default ValidationIcon;
