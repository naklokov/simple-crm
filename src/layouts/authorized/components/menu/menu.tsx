import React, { useMemo, useState, useCallback } from "react";
import { Menu as MenuUI } from "antd";

import { MENU_ITEMS } from "../../../../constants/layouts";
import { getSelectedKeyByUrl } from "./utils";
import { Link, useHistory } from "react-router-dom";
import { filterArrayByPermissions } from "../../../../wrappers";
import { State } from "../../../../__data__/interfaces";
import { connect } from "react-redux";

const { Item } = MenuUI;

interface MenuProps {
  collapsed: boolean;
  permissions: string[];
}

export const Menu = ({ collapsed, permissions }: MenuProps) => {
  const history = useHistory();
  const itemsByPermissions = filterArrayByPermissions(MENU_ITEMS, permissions);
  const selectedKey = getSelectedKeyByUrl(history);

  return (
    <MenuUI
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      inlineCollapsed={collapsed}
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
  permissions: state?.persist?.permissions ?? [],
});

export default connect(mapStateToProps)(Menu);
