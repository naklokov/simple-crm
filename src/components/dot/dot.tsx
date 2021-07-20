import React, { CSSProperties } from "react";

interface DotProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
}

/**
 * Компонент отображение круга определённого цвета
 * @param size Размер в пикселях текущего
 * @param color Текстовое значение цвета круга
 * @param style CSS свойства компонента
 * @returns JSX.Component
 */
export const Dot: React.FC<DotProps> = ({ color, size = 16, style = {} }) => (
  <div
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: size / 2,
      ...style,
    }}
  />
);

export default Dot;
