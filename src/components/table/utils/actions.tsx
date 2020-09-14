import React from "react";
import { ActionProps, EntityProps } from "../../../constants";
import { getFullUrl } from "../../../utils";
import { Delete, View, Call, Email, Link } from "../components";
import { ComponentPermissionsChecker } from "../../../wrappers";
import { Space } from "antd";
import { Done } from "../components/actions";

const getActionComponent = (
  id: string,
  text: string,
  action: ActionProps,
  searched: string,
  onDelete?: (id: string) => void,
  onView?: (id: string) => void,
  onDone?: (id: string) => void,
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
          searched={searched}
          onDelete={onDelete}
          isOwner={isOwner}
        />
      );
    case "done":
      return (
        <Done
          key={id}
          title={action.actionName}
          id={id}
          searched={searched}
          onDone={onDone}
          isOwner={isOwner}
        />
      );
    case "view":
      return (
        <View
          key={id}
          title={action.actionName}
          id={id}
          searched={searched}
          onView={onView}
        />
      );
    case "call":
      return <Call key={id} phone={text} searched={searched} />;
    case "email":
      return <Email key={id} mail={text} searched={searched} />;
    case "href":
      return <Link key={id} title={text} href={fullHref} searched={searched} />;
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
  searched: string,
  onDelete?: (id: string) => void,
  onView?: (id: string) => void,
  onDone?: (id: string) => void
) => (
  <React.Fragment>
    {actions.map((action) => (
      <ComponentPermissionsChecker
        key={action.actionCode}
        availablePermissions={action.permissions}
      >
        <Space size="middle" key={action.actionCode}>
          {getActionComponent(
            entity.id,
            text,
            action,
            searched,
            onDelete,
            onView,
            onDone,
            entity.isOwner
          )}
        </Space>
      </ComponentPermissionsChecker>
    ))}
  </React.Fragment>
);
