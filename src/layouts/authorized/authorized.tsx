import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Layout, notification, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { About, Logo, Menu, Profile, MenuSubDrawer } from "./components";
import { ContainerWrapper } from "../../wrappers";
import { AddUser, Notifications } from "../../components";
import style from "./authorized.module.scss";
import { MenuItemProps, State } from "../../constants";
import { closeMenuSubDrawer, openMenuSubDrawer } from "../../__data__";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: ReactNode;
}

export const Authorized = ({ children }: AuthorizedProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const isSubDrawerOpened = useSelector(
    (state: State) => !!state?.menuSubDrawer?.id
  );

  const handleClickMenuItem = useCallback(
    ({ id, title, type }: MenuItemProps) => {
      // если в данный момент открыта боковушка, то закрываем её
      if (isSubDrawerOpened) {
        dispatch(closeMenuSubDrawer());
        return;
      }

      // если боковушка не открыта и нажатый элемент является боковушкой, то открываем боковое меню
      if (type === "drawer") {
        dispatch(openMenuSubDrawer({ id, title }));
      }
    },
    [dispatch, isSubDrawerOpened]
  );

  useEffect(
    () => () => {
      notification.destroy();
    },
    []
  );

  const toogleCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <ContainerWrapper>
      <Layout className={style.main}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          className={style.sider}
          onCollapse={toogleCollapse}
        >
          <Logo collapsed={collapsed} />
          <Menu onClickItem={handleClickMenuItem} />
        </Sider>

        <Layout style={{ position: "relative" }}>
          <MenuSubDrawer />
          <Header className={style.header}>
            <Space size={16} align="center" style={{ float: "right" }}>
              <AddUser />
              <About />
              <Notifications />
              <Profile />
            </Space>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </ContainerWrapper>
  );
};

export default Authorized;
