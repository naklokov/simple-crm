import React from "react";
import { Skeleton } from "antd";

interface AvatarProps {
  style?: React.CSSProperties;
  size?: "default" | "large";
}

export const Avatar: React.FC<AvatarProps> = ({
  style = {},
  size = "default",
}) => {
  const avatarSize = size === "large" ? 64 : undefined;

  return <Skeleton.Avatar style={style} size={avatarSize} active />;
};
