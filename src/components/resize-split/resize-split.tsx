import React from "react";
import { Resizable } from "re-resizable";

const style = {
  backgroundColor: "white",
  border: "solid 1px #ddd",
};

interface ResizeSplitProps {
  upper: JSX.Element;
  lower: JSX.Element;
}

export const ResizeSplit = ({ upper, lower }: ResizeSplitProps) => (
  <div
    style={{
      width: "auto",
      height: "100%",
      overflow: "hidden",
    }}
  >
    <Resizable
      enable={{
        top: true,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      style={style}
      defaultSize={{
        width: "auto",
        height: "200",
      }}
      bounds="parent"
      maxHeight="75vh"
      minHeight="40"
    >
      {upper}
    </Resizable>
    <div
      style={{
        ...style,
        height: "100%",
        minHeight: "40px",
      }}
    >
      {lower}
    </div>
  </div>
);

export default ResizeSplit;
