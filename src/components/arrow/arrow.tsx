import React from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { ArrowType, ARROW_COLOR } from "./constants";

const Arrow: React.FC<ArrowType> = ({ direction, isActive }) => {
  const color = isActive ? ARROW_COLOR.ACTIVE : ARROW_COLOR.DEFAULT;
  switch (direction) {
    case "up":
      return <CaretUpOutlined style={{ color }} />;
    case "down":
      return <CaretDownOutlined style={{ color }} />;
    default:
      return null;
  }
};

export default Arrow;
