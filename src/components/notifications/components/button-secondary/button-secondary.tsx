import React, { CSSProperties, ReactNode } from "react";
import { ExtendedText } from "../../../extended-text";

import styleModule from "./button-secondary.module.scss";

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick: () => void;
  style?: CSSProperties;
}

const ButtonSecondary = ({
  children,
  onClick,
  style,
}: ButtonSecondaryProps) => (
  <div style={style} className={styleModule.button} onClick={onClick}>
    <ExtendedText size="small" type="secondary">
      {children}
    </ExtendedText>
  </div>
);

export default ButtonSecondary;
