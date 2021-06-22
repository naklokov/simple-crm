import React, { ReactNode } from "react";
import { Typography } from "antd";

interface RoleHeaderProps {
  children: ReactNode;
}

export const RoleHeader: React.FC<RoleHeaderProps> = ({ children }) => (
  <Typography.Title level={4} style={{ marginBottom: 0 }}>
    {children}
  </Typography.Title>
);

export default RoleHeader;
