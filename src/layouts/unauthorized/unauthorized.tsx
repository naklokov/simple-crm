import React, { useEffect, ReactNode } from "react";

import { useDispatch, useSelector } from "react-redux";
import style from "./unauthorized.module.scss";
import { logo } from "../../assets/img";
import { State } from "../../constants";
import { checkAuthCookie } from "../../utils";
import { setAuth } from "../../__data__";

interface LoginProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export const Unauthorized: React.FC<LoginProps> = ({ children }) => {
  const auth = useSelector((state: State) => state?.persist?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const isCheckSuccessfull = checkAuthCookie();
    if (isCheckSuccessfull && !auth) {
      dispatch(setAuth(true));
    }
  }, [auth, dispatch]);

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

export default Unauthorized;
