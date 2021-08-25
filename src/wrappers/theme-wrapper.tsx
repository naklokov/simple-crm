import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { State } from "../constants";
import LightTheme from "../assets/themes/lightTheme";
import DarkTheme from "../assets/themes/darkTheme";

interface ThemeWrapperProps {
  children: ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const theme = useSelector((state: State) => state?.app?.theme);

  return (
    <>
      <React.Suspense fallback={<></>}>
        {theme === "light" && <LightTheme />}
        {theme === "dark" && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  );
};

export default ThemeWrapper;
