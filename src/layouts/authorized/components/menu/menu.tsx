import React from "react";
import { Menu as MenuUI } from "antd";

import { MENUS_ELEMENTS } from "../../../../constants/layouts";
import { Link } from "react-router-dom";
const { Item } = MenuUI;

interface MenuProps {
  selectedId?: string;
}

const defaultSelectedKey = MENUS_ELEMENTS[0].id;

export const Menu = () => (
  <MenuUI mode="vertical" defaultSelectedKeys={[defaultSelectedKey]}>
    {MENUS_ELEMENTS.map(({ id, icon, title, url }) => (
      <Item key={id} icon={icon}>
        <Link to={url}>{title}</Link>
      </Item>
    ))}
  </MenuUI>
);

export default Menu;
