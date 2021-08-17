import React, { ReactNode } from "react";

interface SuffixIconProps {
  icon: ReactNode;
}

export const SuffixIcon: React.FC<SuffixIconProps> = ({ icon }) => (
  <div style={{ position: "absolute", right: "11px", top: "5px" }}>{icon}</div>
);
