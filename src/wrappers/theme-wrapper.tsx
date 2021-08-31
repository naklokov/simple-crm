import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../constants";
import { DarkTheme, LightTheme } from "../assets/themes";
import { Loader } from "../components";

interface ThemeWrapperProps {
  children: ReactNode;
}

function loadStyleSheet(url: string) {
  const sheet: any = document.createElement("link");
  sheet.rel = "stylesheet";
  sheet.href = url;
  sheet.type = "text/css";
  document.head.appendChild(sheet);
  let timer: any;

  // TODO: handle failure
  return new Promise((resolve) => {
    sheet.onload = resolve;
    sheet.addEventListener("load", resolve);
    sheet.onreadystatechange = () => {
      if (sheet.readyState === "loaded" || sheet.readyState === "complete") {
        resolve(true);
      }
    };

    timer = setInterval(() => {
      try {
        for (let i = 0; i < document.styleSheets.length; i++) {
          if (document.styleSheets[i].href === sheet.href) resolve(true);
        }
      } catch (e) {
        console.error(e);
      }
    }, 250);
  }).then(() => {
    clearInterval(timer);
    return sheet;
  });
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const theme = useSelector((state: State) => state?.persist?.theme);

  useEffect(() => {
    debugger;
    const { head } = document;
    const link = document.createElement("link");
    const stylePath =
      theme === "dark"
        ? "../assets/themes/dark/dark.css"
        : "../assets/themes/light/light.css";

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = stylePath;

    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [theme]);

  return (
    <>
      {/* <React.Suspense fallback={<Loader />}>
        {theme === "light" && <LightTheme />}
        {theme === "dark" && <DarkTheme />}
      </React.Suspense> */}
      {children}
    </>
  );
};

export default ThemeWrapper;
