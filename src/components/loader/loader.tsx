import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

import style from "./loader.module.scss";

const Loader = () => (
  <div className={style.loader}>
    <PacmanLoader size={70} loading color="#FFA500 " />
  </div>
);

export default Loader;
