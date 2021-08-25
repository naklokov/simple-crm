import React from "react";
import cn from "classnames";
import PacmanLoader from "react-spinners/PacmanLoader";

import { useSelector } from "react-redux";
import style from "./loader.module.scss";
import { SECONDARY_BACKGROUND_COLOR, State } from "../../constants";

const Loader = () => {
  const theme = useSelector((state: State) => state?.app?.theme);
  const themeStyle = theme === "dark" ? style.loaderDark : style.loaderLight;

  return (
    <div className={cn(SECONDARY_BACKGROUND_COLOR, themeStyle)}>
      <PacmanLoader size={70} loading color="#FFA500" />
    </div>
  );
};

export default Loader;
