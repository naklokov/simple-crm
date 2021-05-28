import React from "react";
import { MenuItemProps } from "../../../../../../constants";
import { Drawer, Link } from "./components";

export const Item = ({ item }: { item: MenuItemProps }) => {
  const { type, title, url = "" } = item;

  if (type === "drawer") {
    return <Drawer title={title} />;
  }

  return <Link title={title} url={url} />;
};
