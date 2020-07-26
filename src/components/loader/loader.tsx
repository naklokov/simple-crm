import React from "react";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

import style from "./loader.module.scss";

const override = css`
  display: block;
  left: -50px;
  border-color: red;
`;

const Loader = () => (
  <div className={style.loader}>
    <PacmanLoader css={override} size={70} loading color={"#FFA500 "} />
  </div>
);

export default Loader;
