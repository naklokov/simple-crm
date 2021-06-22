import { Space, Typography } from "antd";
import React, { ReactNode } from "react";

interface InfoProps {
  icon: ReactNode;
  text: string;
}

export const Info: React.FC<InfoProps> = ({ icon, text }) => (
  <Space>
    {icon}
    <Typography.Text>{text}</Typography.Text>
  </Space>
);
