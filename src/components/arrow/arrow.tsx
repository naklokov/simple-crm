import React from "react";
import { ArrowType } from "./constants";
import { ArrowIcon } from "../../assets/icons";

import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants";

const Arrow: React.FC<ArrowType> = ({ direction, isActive }) => (
  <ArrowIcon
    direction={direction}
    className={isActive ? PRIMARY_COLOR : SECONDARY_COLOR}
  />
);

export default Arrow;
