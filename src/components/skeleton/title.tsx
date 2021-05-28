import React from "react";
import { Skeleton } from "antd";

interface TitleProps {
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({ style = {} }) => (
  <Skeleton.Input
    style={{ width: "400px", height: "20px", marginTop: "8px", ...style }}
    active
  />
);
