import React from "react";
import { Space } from "antd";
import { ActionProps, ColumnProps, EntityOwnerProps } from "../../../constants";
import { getFullUrl } from "../../../utils";
import { Delete, View, Call, Email, Link } from "../components";
import { ComponentPermissionsChecker } from "../../../wrappers";
import { Done } from "../components/actions";

const getActionComponent = (
  entity: EntityOwnerProps,
  text: string,
  action: ActionProps,
  column?: ColumnProps
) => {
  const fullHref = getFullUrl(action.href, entity.id);
  switch (action.actionType) {
    case "delete":
      return (
        <Delete
          key={entity.id}
          title={action.actionName}
          id={entity.id}
          hasRight={entity?.isOwner?.DELETE}
        />
      );
    case "done":
      return (
        <Done
          key={entity.id}
          title={action.actionName}
          id={entity.id}
          hasRight={entity?.isOwner?.UPDATE}
        />
      );
    case "view":
      return <View key={entity.id} title={action.actionName} id={entity.id} />;
    case "call":
      return <Call key={entity.id} phone={text} column={column} />;
    case "email":
      return <Email key={entity.id} mail={text} column={column} />;
    case "href":
      return (
        <Link key={entity.id} title={text} href={fullHref} column={column} />
      );
    default:
      return (
        <a
          key={entity.id}
          href="/"
        >{`Неизвестное событие ${action.actionType}`}</a>
      );
  }
};

export const renderActions = (
  actions: ActionProps[],
  text: string,
  entity: EntityOwnerProps,
  column?: ColumnProps
) => (
  <>
    {actions.map((action) => (
      <ComponentPermissionsChecker
        key={action.actionType}
        availablePermissions={action.permissions}
      >
        <Space size="middle">
          {getActionComponent(entity, text, action, column)}
        </Space>
      </ComponentPermissionsChecker>
    ))}
  </>
);
