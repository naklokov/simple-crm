import React, { ReactNode, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../constants";
import { DarkTheme, LightTheme } from "../assets/themes";
import { Loader } from "../components";

interface ThemeWrapperProps {
  children: ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state: State) => state?.persist?.theme);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

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
