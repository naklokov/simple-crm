import React from "react";
import { ActionType } from "../../../constants/interfaces";
import { Delete, Call, Link } from "../components";
import { getHref } from "./conditional";

export const mapAction = (
  text: string,
  type: ActionType,
  actionName: string,
  href?: string,
  id?: string
) => {
  const fullHref = getHref(href, id);
  switch (type) {
    case "delete":
      return <Delete href={fullHref} title={actionName} />;
    case "call":
      return <Call phone={text} />;
    case "href":
      return <Link title={text} href={fullHref} />;
    default:
      return <a href="/">{`Неизвестное событие ${type}`}</a>;
  }
};
