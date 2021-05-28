import React from "react";

interface DrawerProps {
  title: string;
}

export const Drawer: React.FC<DrawerProps> = ({ title }) => (
  // eslint-disable-next-line
  <>
    <span>{title}</span>
    <i className="ant-menu-submenu-arrow" />
  </>
);
