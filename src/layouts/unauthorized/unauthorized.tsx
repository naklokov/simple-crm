import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import style from "./unauthorized.module.scss";
import { logo } from "../../assets/img";
import { State } from "../../constants";
import { Loader } from "../../components";
import { checkAuthCookie } from "../../utils";
import { setAuth as setAuthAction } from "../../__data__";

interface LoginProps {
  title?: string;
  auth: boolean;
  setAuth: (auth: boolean) => void;
  description?: string;
  children: JSX.Element;
}

export const Unauthorized: React.FC<LoginProps> = ({
  auth,
  setAuth,
  children,
}) => {
  useEffect(() => {
    const isCheckSuccessfull = checkAuthCookie();
    if (isCheckSuccessfull && !auth) {
      setAuth(true);
    }
  }, [auth, setAuth]);

  return (
    <div className={style.form}>
      <div className={style.container}>
        <div className={style.layout}>
          <div className={style.imgContainer}>
            <img className={style.img} alt="logo" src={logo} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
const mapStateToProps = (state: State) => ({
  auth: state?.persist?.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuth: (isAuth: boolean) => dispatch(setAuthAction(isAuth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Unauthorized);
