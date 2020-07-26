import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";

import { Loader } from "../../components";
import { Logo, Menu } from "./components";
import { State } from "../../__data__/interfaces";

import style from "./authorized.module.scss";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: JSX.Element;
  loading: boolean;
}

export const Authorized = ({ children, loading }: AuthorizedProps) => {
  return (
    <div>
      {loading && <Loader />}
      <Layout>
        <Sider theme="light" className={style.sider}>
          <Logo collapsed={false} />
          <Menu />
        </Sider>
        <Layout>
          <Header className={style.header}>Header</Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  loading: state?.persist?.loading,
});

export default connect(mapStateToProps)(Authorized);
