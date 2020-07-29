import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { Loader } from "../../components";
import { Logo, Menu, Profile } from "./components";
import { State } from "../../__data__/interfaces";

import style from "./authorized.module.scss";
import { setMenuCollapsed } from "../../__data__";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: JSX.Element;
  loading: boolean;
  isMenuCollapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const Authorized = ({
  children,
  loading,
  isMenuCollapsed,
  setCollapsed,
}: AuthorizedProps) => {
  const iconCollapsed = isMenuCollapsed ? (
    <MenuUnfoldOutlined />
  ) : (
    <MenuFoldOutlined />
  );

  const handleCollapseMenu = () => {
    setCollapsed(!isMenuCollapsed);
  };

  return (
    <div>
      {loading && <Loader />}
      <Layout>
        <Sider
          collapsible
          collapsed={isMenuCollapsed}
          theme="light"
          className={style.sider}
          onCollapse={handleCollapseMenu}
        >
          <Logo collapsed={isMenuCollapsed} />
          <Menu collapsed={isMenuCollapsed} />
        </Sider>
        <Layout>
          <Header className={style.header}>
            <Button
              className={style.buttonCollapsed}
              icon={iconCollapsed}
              onClick={handleCollapseMenu}
            />
            <div className={style.profile}>
              <Profile />
            </div>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state?.persist?.loading,
  isMenuCollapsed: state?.persist?.menuCollapsed,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCollapsed: (value: boolean) => {
    dispatch(setMenuCollapsed(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
