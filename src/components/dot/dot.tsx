import React, { CSSProperties } from "react";
import cn from "classnames";
import dotStyle from "./dot.module.scss";

interface DotProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Компонент отображение круга определённого цвета
 * @param size Размер в пикселях текущего
 * @param color Текстовое значение цвета круга
 * @param style CSS свойства компонента
 * @returns JSX.Component
 */
export const Dot: React.FC<DotProps> = ({
  className,
  size = 16,
  color = "success",
  style = {},
}) => (
  <div
    className={cn(dotStyle[color], className)}
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      ...style,
    }}
  />
);

export default Dot;
