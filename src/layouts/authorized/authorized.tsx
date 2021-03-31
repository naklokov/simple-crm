import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Layout, notification, Space } from "antd";
import { connect } from "react-redux";
import { About, Logo, Menu, Profile } from "./components";
import { State } from "../../constants";
import { ContainerWrapper } from "../../wrappers";
import { AddUser, Joke, Loader, Notifications } from "../../components";
import style from "./authorized.module.scss";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: ReactNode;
  loading: boolean;
}

export const Authorized = ({ children, loading }: AuthorizedProps) => {
  const [collapsed, setCollapsed] = useState(false);
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
          collapsible
          collapsed={collapsed}
          theme="light"
          className={style.sider}
          onCollapse={toogleCollapse}
        >
          <Logo collapsed={collapsed} />
          <Menu />
        </Sider>
        <Layout>
          <Header className={style.header}>
            <Space size={16} align="center" style={{ float: "right" }}>
              <AddUser />
              <About />
              <Notifications />
              <Profile />
            </Space>
          </Header>
          {loading && <Loader />}
          <Content className={style.content}>{children}</Content>
        </Layout>
      </Layout>
      <Joke src="https://media.tenor.com/images/eba7267a6c8b98cb97e1b07c666aaadb/tenor.gif" />
    </ContainerWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state?.app?.loading,
});

export default connect(mapStateToProps)(Authorized);
