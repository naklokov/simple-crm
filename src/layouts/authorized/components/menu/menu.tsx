import React, { useState, useEffect } from "react";
import { Menu as MenuUI } from "antd";

import { MENU_ITEMS } from "../../../../constants/layouts";
import { getSelectedKeyByUrl } from "./utils";
import { Link, useLocation } from "react-router-dom";
import { filterArrayByPermissions } from "../../../../wrappers";
import { State } from "../../../../__data__/interfaces";
import { connect } from "react-redux";

const { Item } = MenuUI;

interface MenuProps {
  permissions: string[];
}

export const Menu = ({ permissions }: MenuProps) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const itemsByPermissions = filterArrayByPermissions(MENU_ITEMS, permissions);

  useEffect(() => {
    const selectedKey = getSelectedKeyByUrl(location);
    setSelectedKey(selectedKey);
  }, [location]);

  return (
    <MenuUI mode="inline" selectedKeys={[selectedKey]}>
      {itemsByPermissions.map(({ id, icon, title, url }) => (
        <Item key={id} icon={icon}>
          <Link to={url}>{title}</Link>
        </Item>
      ))}
    </MenuUI>
  );
};

const mapStateToProps = (state: State) => ({
  permissions: state?.persist?.permissions ?? [],
});

export default connect(mapStateToProps)(Menu);
