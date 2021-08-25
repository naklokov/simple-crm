import React from "react";
import { ArrowType } from "./constants";
import { ArrowIcon } from "../../assets/icons";

import style from "./arrow.module.scss";

const Arrow: React.FC<ArrowType> = ({ direction, isActive }) => (
  <ArrowIcon
    direction={direction}
    className={isActive ? style.active : style.default}
  />
);

export default Arrow;
