import React, { useEffect } from "react";

import style from "./unauthorized.module.scss";
import { logo } from "../../assets/img";
import { Typography } from "antd";
import { State } from "../../__data__/interfaces";
import { connect } from "react-redux";
import { Loader } from "../../components";
import { checkAuthCookie } from "../../utils";
import { Dispatch } from "@reduxjs/toolkit";
import { setAuth as setAuthAction } from "../../__data__";

interface LoginProps {
  title?: string;
  loading: boolean;
  auth: boolean;
  setAuth: (auth: boolean) => void;
  description?: string;
  children: JSX.Element;
}

export const Unauthorized = ({
  title,
  description,
  auth,
  setAuth,
  loading,
  children,
}: LoginProps) => {
  useEffect(() => {
    const isAuth = checkAuthCookie();
    if (isAuth && !auth) {
      setAuth(true);
    }
  }, [auth]);

  return (
    <div className={style.form}>
      <div className={style.container}>
        <div className={style.layout}>
          <div className={style.imgContainer}>
            <img className={style.img} alt="logo" src={logo} />
          </div>
          {loading && <Loader />}
          {title && (
            <Typography.Title className={style.title} level={2}>
              {title}
            </Typography.Title>
          )}
          {description && (
            <Typography.Title
              className={style.description}
              level={4}
              type="secondary"
            >
              {description}
            </Typography.Title>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => ({
  loading: state?.app?.loading ?? false,
  auth: state?.persist?.auth ?? false,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuth: (isAuth: boolean) => dispatch(setAuthAction(isAuth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Unauthorized);
