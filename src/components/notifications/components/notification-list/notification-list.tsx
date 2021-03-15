import React from "react";
import { List } from "antd";
import { NotificationProps } from "../../../../constants";
import { Notification } from "../notification";

interface NotificationListProps {
  dataSource: NotificationProps[];
  emptyText: string;
  onClickDelete?: (id: string) => void;
  onClickRead?: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  dataSource,
  emptyText,
  onClickRead,
  onClickDelete,
}) => (
  <List
    itemLayout="horizontal"
    dataSource={dataSource}
    locale={{
      emptyText,
    }}
    renderItem={(notification) => (
      <Notification
        {...notification}
        key={notification.id}
        onHide={onClickRead}
        onDelete={onClickDelete}
      />
    )}
  />
);

export default NotificationList;
