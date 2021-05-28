import React from "react";
import { Skeleton } from "antd";

interface InputProps {
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({ style = {} }) => (
  <Skeleton.Input
    style={{ width: "150px", height: "16px", marginTop: "3px", ...style }}
    active
  />
);
