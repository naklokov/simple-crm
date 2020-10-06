import React, { ReactNode, useCallback, useState } from "react";
import { Layout, Space } from "antd";
import { connect } from "react-redux";
import { About, Logo, Menu, Profile } from "./components";
import { State } from "../../__data__/interfaces";
import { ContainerWrapper, NotificationService } from "../../wrappers";
import { Loader } from "../../components";
import style from "./authorized.module.scss";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: ReactNode;
  loading: boolean;
}

export const Authorized = ({ children, loading }: AuthorizedProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseMenu = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <ContainerWrapper>
      {/* <NotificationService> */}
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
              <About />
              <Profile />
            </Space>
          </Header>
          {loading && <Loader />}
          <Content className={style.content}>{children}</Content>
        </Layout>
      </Layout>
      {/* </NotificationService> */}
    </ContainerWrapper>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state?.app?.loading,
});

export default connect(mapStateToProps)(Authorized);
