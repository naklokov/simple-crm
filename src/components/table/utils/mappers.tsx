import React from "react";
import { TableActionProps, EntityProps } from "../../../constants/interfaces";
import { Delete, Call, Link } from "../components";
import { getHref } from "./conditional";

export const mapWithKey = (dataSource: EntityProps[]): any =>
  dataSource.map((item: EntityProps) => ({ key: item.id, ...item }));

export const mapAction = (
  id: string,
  text: string,
  action: TableActionProps,
  onDelete?: (id: string) => void
) => {
  const fullHref = getHref(action.href, id);
  switch (action.actionType) {
    case "delete":
      return (
        <Delete
          href={fullHref}
          title={action.actionName}
          id={id}
          onDelete={onDelete}
        />
      );
    case "call":
      return <Call phone={text} />;
    case "href":
      return <Link title={text} href={fullHref} />;
    default:
      return <a href="/">{`Неизвестное событие ${action.actionType}`}</a>;
  }
};
