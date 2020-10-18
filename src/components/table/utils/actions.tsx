import React from "react";
import { ActionProps, ColumnProps, EntityProps } from "../../../constants";
import { getFullUrl } from "../../../utils";
import { Delete, View, Call, Email, Link } from "../components";
import { ComponentPermissionsChecker } from "../../../wrappers";
import { Space } from "antd";
import { Done } from "../components/actions";

const getActionComponent = (
  id: string,
  text: string,
  action: ActionProps,
  column?: ColumnProps,
  isOwner?: boolean
) => {
  const fullHref = getFullUrl(action.href, id);
  switch (action.actionType) {
    case "delete":
      return (
        <Delete
          key={id}
          href={fullHref}
          title={action.actionName}
          id={id}
          isOwner={isOwner}
        />
      );
    case "done":
      return (
        <Done key={id} title={action.actionName} id={id} isOwner={isOwner} />
      );
    case "view":
      return <View key={id} title={action.actionName} id={id} />;
    case "call":
      return <Call key={id} phone={text} column={column} />;
    case "email":
      return <Email key={id} mail={text} column={column} />;
    case "href":
      return <Link key={id} title={text} href={fullHref} column={column} />;
    default:
      return (
        <a key={id} href="/">{`Неизвестное событие ${action.actionType}`}</a>
      );
  }
};

export const renderActions = (
  actions: ActionProps[],
  text: string,
  entity: EntityProps,
  column?: ColumnProps
) => (
  <React.Fragment>
    {actions.map((action) => (
      <ComponentPermissionsChecker
        key={action.actionType}
        availablePermissions={action.permissions}
      >
        <Space size="middle">
          {getActionComponent(entity.id, text, action, column, entity?.isOwner)}
        </Space>
      </ComponentPermissionsChecker>
    ))}
  </React.Fragment>
);
