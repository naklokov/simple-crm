import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

import { useSelector } from "react-redux";
import style from "./loader.module.scss";
import { State } from "../../constants";

const Loader = () => {
  const theme = useSelector((state: State) => state?.app?.theme);
  const themeStyle = theme === "dark" ? style.loaderDark : style.loaderLight;

  return (
    <div className={themeStyle}>
      <PacmanLoader size={70} loading color="#FFA500" />
    </div>
  );
};

export default Loader;
