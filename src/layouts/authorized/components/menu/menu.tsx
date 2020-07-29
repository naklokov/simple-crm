import React from "react";
import { Menu as MenuUI } from "antd";

import { MENU_ITEMS } from "../../../../constants/layouts";
import { getSelectedKeyByUrl } from "./utils";
import { Link, useHistory } from "react-router-dom";

const { Item } = MenuUI;

interface MenuProps {
  collapsed: boolean;
}

export const Menu = ({ collapsed }: MenuProps) => {
  const history = useHistory();
  const selectedKey = getSelectedKeyByUrl(history);

  return (
    <MenuUI
      mode="inline"
      selectedKeys={[selectedKey]}
      inlineCollapsed={collapsed}
    >
      {MENU_ITEMS.map(({ id, icon, title, url }) => (
        <Item key={id} icon={icon}>
          <Link to={url}>{title}</Link>
        </Item>
      ))}
    </MenuUI>
  );
};

export default Menu;
