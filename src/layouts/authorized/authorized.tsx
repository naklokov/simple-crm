import React, { useEffect } from "react";
import { Layout } from "antd";
import axios from "axios";
import Cookie from "js-cookie";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { Loader } from "../../components";
import { Logo, Menu, Profile } from "./components";
import { State } from "../../__data__/interfaces";

import style from "./authorized.module.scss";
import { setMenuCollapsed, setProfileInfo } from "../../__data__";
import { urls } from "../../constants";
import { COOKIES } from "../../constants/http";
import { logger } from "../../utils";
import { useHistory } from "react-router";

const { Sider, Content, Header } = Layout;

interface AuthorizedProps {
  children: JSX.Element;
  loading: boolean;
  isMenuCollapsed: boolean;
  setCollapsed: (value: boolean) => void;
  setProfile: (profileInfo: {}) => void;
}

export const Authorized = ({
  children,
  loading,
  isMenuCollapsed,
  setCollapsed,
  setProfile,
}: AuthorizedProps) => {
  const history = useHistory();

  const handleCollapseMenu = () => {
    setCollapsed(!isMenuCollapsed);
  };

  const getProfileInfo = async () => {
    const username = Cookie.get(COOKIES.USERNAME);
    try {
      const profileInfo = await axios.get(urls.profile.info, {
        params: { username },
      });
      setProfile(profileInfo);
    } catch (error) {
      logger.error({ message: error.message, username });
      // TODO как обработать ошибки клиента?
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

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
  setProfile: (profileInfo: {}) => {
    dispatch(setProfileInfo(profileInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);
