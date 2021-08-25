import React from "react";
import { Avatar as AvatarUi } from "antd";
import { UserIcon } from "../../assets/icons";

interface AvatarProps {
  src?: string;
  size?: number | "default" | "large" | "small";
}

export const Avatar: React.FC<AvatarProps> = ({ src, size = "default" }) => (
  <AvatarUi src={src} size={size} icon={<UserIcon />} />
);

export default Avatar;
