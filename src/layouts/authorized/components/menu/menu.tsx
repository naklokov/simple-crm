import React, { useState, useEffect } from "react";
import { Menu as MenuUI } from "antd";

import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { MENU_ITEMS, State } from "../../../../constants";
import { getSelectedKeyByUrl } from "./utils";
import { filterArrayByPermissions } from "../../../../wrappers";

const { Item } = MenuUI;

interface MenuProps {
  permissions: string[];
}

export const Menu = ({ permissions }: MenuProps) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const itemsByPermissions = filterArrayByPermissions(MENU_ITEMS, permissions);

  useEffect(() => {
    setSelectedKey(getSelectedKeyByUrl(location));
  }, [location]);

  return (
    <MenuUI
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      style={{ border: "none" }}
    >
      {itemsByPermissions.map(({ id, icon, title, url }) => (
        <Item key={id} icon={icon}>
          <Link to={url}>{title}</Link>
        </Item>
      ))}
    </MenuUI>
  );
};

const mapStateToProps = (state: State) => ({
  permissions: state?.persist?.permissions,
});

export default connect(mapStateToProps)(Menu);
