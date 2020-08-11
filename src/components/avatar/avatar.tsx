import React from "react";
import { Avatar as AvatarUi } from "antd";

import { UserOutlined } from "@ant-design/icons";

interface AvatarProps {
  src?: string;
  size?: number | "default" | "large" | "small";
}

export const Avatar = ({ src, size = "default" }: AvatarProps) => (
  <AvatarUi src={src} size={size} icon={<UserOutlined />} />
);

export default Avatar;
