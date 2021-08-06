export type ArrowDirection = "up" | "down";

export interface ArrowType {
  direction: ArrowDirection;
  isActive: boolean;
}

export const ARROW_COLOR = {
  DEFAULT: "#bfbfbf",
  ACTIVE: "#1890ff",
};
