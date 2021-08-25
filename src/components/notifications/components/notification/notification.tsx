import React, { ReactNode, useCallback } from "react";
import { List } from "antd";
import { useTranslation } from "react-i18next";
import { NotificationProps } from "../../../../constants";
import { ButtonSecondary } from "../button-secondary";

import style from "./notification.module.scss";
import { BellIcon } from "../../../../assets/icons";

interface NotificationComponentProps extends NotificationProps {
  icon?: ReactNode;
  actions?: ReactNode[];
  onHide?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const Notification: React.FC<NotificationComponentProps> = ({
  id,
  icon = <BellIcon />,
  title,
  content,
  onHide,
  onDelete,
}) => {
  const [t] = useTranslation("notifications");
  const actions = [];

  const handleHide = useCallback(() => {
    onHide?.(id);
  }, [onHide, id]);

  const handleDelete = useCallback(() => {
    onDelete?.(id);
  }, [onDelete, id]);

  const hide = (
    <ButtonSecondary onClick={handleHide}>{t("actions.read")}</ButtonSecondary>
  );

  const del = (
    <ButtonSecondary onClick={handleDelete}>
      {t("actions.delete")}
    </ButtonSecondary>
  );

  if (onHide) {
    actions.push(hide);
  }

  if (onDelete) {
    actions.push(del);
  }

  const avatar = <div className={style.icon}>{icon}</div>;

  return (
    <List.Item actions={actions}>
      <List.Item.Meta avatar={avatar} title={title} description={content} />
    </List.Item>
  );
};

export default Notification;
