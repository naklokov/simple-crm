import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Menu as MenuUI } from "antd";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State, MENU_ITEMS, MenuItemProps } from "../../../../constants";
import { getSelectedKeyByUrl } from "./utils";
import { Item } from "./components";
import { filterArrayByPermissions } from "../../../../wrappers";

interface MenuProps {
  onClickItem: (item: MenuItemProps) => void;
}

export const Menu: React.FC<MenuProps> = ({ onClickItem }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const permissions = useSelector(
    (state: State) => state?.persist?.permissions
  );

  const availableItems = useMemo(
    () => filterArrayByPermissions(MENU_ITEMS, permissions),
    [permissions]
  );

  useEffect(() => {
    setSelectedKey(getSelectedKeyByUrl(location));
  }, [location]);

  const handleClick = useCallback(
    ({ key }) => {
      onClickItem(availableItems.find(({ id }) => id === key));
    },
    [availableItems, onClickItem]
  );

  return (
    <MenuUI
      theme="light"
      mode="inline"
      onClick={handleClick}
      selectedKeys={[selectedKey]}
      className="background-80"
      style={{ border: "none" }}
    >
      {availableItems.map((item) => (
        <MenuUI.Item key={item.id} icon={item.icon}>
          <Item item={item} />
        </MenuUI.Item>
      ))}
    </MenuUI>
  );
};

export default Menu;
