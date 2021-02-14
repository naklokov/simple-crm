import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Layout, notification, Space } from "antd";
import { connect } from "react-redux";
import { About, Logo, Menu, Profile } from "./components";
import { State } from "../../constants";
import { ContainerWrapper } from "../../wrappers";
import { AddUser, Loader } from "../../components";
import style from "./authorized.module.scss";
import { useNotificationService } from "../../utils/notification-service";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: ReactNode;
  loading: boolean;
}

export const Authorized = ({ children, loading }: AuthorizedProps) => {
  const [collapsed, setCollapsed] = useState(false);
  useNotificationService();
  useEffect(() => {
    return () => {
      notification.destroy();
    };
  }, []);

  const handleCollapseMenu = useCallback(() => {
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
          onCollapse={handleCollapseMenu}
        >
          <Logo collapsed={collapsed} />
          <Menu />
        </Sider>
        <Layout>
          <Header className={style.header}>
            <Space size={16} style={{ float: "right" }}>
              <AddUser />
              <About />
              <Profile />
            </Space>
          </Header>
          {loading && <Loader />}
          <Content className={style.content}>{children}</Content>
        </Layout>
      </Layout>
    </ContainerWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state?.app?.loading,
});

export default connect(mapStateToProps)(Authorized);
