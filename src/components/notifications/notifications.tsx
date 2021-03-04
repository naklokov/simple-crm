import React, { useCallback, useMemo, useState } from "react";
import { Badge, Popover, Collapse, Typography } from "antd";
import {
  useNotificationService,
  updateNotificationStatus,
} from "../../utils/notification-service";
import { ButtonLayout } from "../button-layout";
import { BellOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ButtonSecondary, NotificationList } from "./components";

const { Panel } = Collapse;

const Notifications = () => {
  const [t] = useTranslation("notifications");
  const [visible, setVisible] = useState(false);

  const handleClickLink = useCallback((id: string) => {
    handleChangeVisible(false);
    handleClickRead(id);
  }, []);

  const { notifications, setNotifications } = useNotificationService(
    handleClickLink
  );

  const handleReadAll = useCallback(() => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, status: "read" }))
    );
  }, [setNotifications, notifications]);

  const handleClickRead = useCallback(
    (id: string) => {
      setNotifications((prevNotifications) =>
        updateNotificationStatus(id, prevNotifications, "read")
      );
    },
    [setNotifications, notifications]
  );

  const handleClickDelete = useCallback(
    (id: string) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== id)
      );
    },
    [setNotifications, notifications]
  );

  const handleChangeVisible = useCallback(
    (value) => {
      setVisible(value);
    },
    [visible]
  );

  const unreadNotifications = useMemo(
    () => notifications.filter(({ status }) => status === "unread"),
    [notifications]
  );

  const readNotifications = useMemo(
    () => notifications.filter(({ status }) => status === "read"),
    [notifications]
  );

  const popoverTitle = (
    <div style={{ margin: "4px 0" }}>
      <Typography.Text>{t("popover.title")}</Typography.Text>
      <ButtonSecondary style={{ float: "right" }} onClick={handleReadAll}>
        {t("popover.hide.all")}
      </ButtonSecondary>
    </div>
  );

  const content = (
    <div style={{ width: "500px", maxHeight: "60vh", overflow: "auto" }}>
      <NotificationList
        emptyText={t("list.notifications.unread.empty")}
        dataSource={unreadNotifications}
        onClickRead={handleClickRead}
        onClickDelete={handleClickDelete}
      />
      <Collapse expandIconPosition="right" bordered={false}>
        <Panel
          style={{ border: 0 }}
          header={
            <Typography.Text strong>
              {t("collapse.title.read", {
                count: readNotifications.length,
              })}
            </Typography.Text>
          }
          key="read"
        >
          <NotificationList
            emptyText={t("list.notifications.read.empty")}
            dataSource={readNotifications}
            onClickDelete={handleClickDelete}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return (
    <ButtonLayout tooltip={t("tooltip")}>
      <Popover
        onVisibleChange={handleChangeVisible}
        visible={visible}
        placement="bottomRight"
        title={popoverTitle}
        trigger="click"
        content={content}
        arrowPointAtCenter
      >
        <Badge count={unreadNotifications.length}>
          <BellOutlined style={{ fontSize: "24px" }} />
        </Badge>
      </Popover>
    </ButtonLayout>
  );
};

export default Notifications;
