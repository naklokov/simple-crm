import React, { ReactNode, useCallback } from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../constants";
import { closeMenuSubDrawer } from "../../../../__data__";
import { DepartmentsSelect } from "./components";

const drawersMap: { [key: string]: ReactNode } = {
  departments: <DepartmentsSelect />,
};

interface MenuSubDrawerProps {
  style?: React.CSSProperties;
}

export const MenuSubDrawer: React.FC<MenuSubDrawerProps> = ({ style = {} }) => {
  const dispatch = useDispatch();
  const { id, title, width } = useSelector(
    (state: State) => state?.menuSubDrawer ?? {}
  );

  const handleClose = useCallback(() => {
    dispatch(closeMenuSubDrawer());
  }, [dispatch]);

  return (
    <Drawer
      title={title}
      placement="left"
      onClose={handleClose}
      visible={!!id}
      width={width}
      bodyStyle={{ padding: 0 }}
      style={{
        position: "absolute",
        display: id ? "block" : "none",
        ...style,
      }}
      getContainer={false}
    >
      {drawersMap?.[id] ?? null}
    </Drawer>
  );
};

export default MenuSubDrawer;
