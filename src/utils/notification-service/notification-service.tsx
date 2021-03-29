import React, { useCallback, useEffect, useState } from "react";

import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  showNotification,
  useOverdueTasksTotal,
  useActiveTasks,
  getMoreActiveTasksProps,
  getOverdueTasksProps,
} from "./utils";
import {
  NotificationProps,
  TASKS_SHOW_LIMIT,
  TASKS_TYPES_ICONS_MAP,
} from "../../constants";
import { play as playSound } from "../sounds";
import { Title, Content } from "./components";

export const useNotificationService = (onClickLink: (id: string) => void) => {
  const [t] = useTranslation("notifications");
  const history = useHistory();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const activeTasks = useActiveTasks();
  const overdueTasksTotal = useOverdueTasksTotal();

  const addNotification = useCallback((notification: NotificationProps) => {
    setNotifications((prevNotifications) => [
      { ...notification, status: "unread" },
      ...prevNotifications,
    ]);
  }, []);

  // обработка просроченных задач
  useEffect(() => {
    if (overdueTasksTotal) {
      const props = getOverdueTasksProps(
        overdueTasksTotal,
        onClickLink,
        history,
        t
      );

      showNotification(props);
      addNotification({
        ...props,
        dateTime: moment().toISOString(),
      });
    }
  }, [overdueTasksTotal, addNotification, history, onClickLink, t]);

  // обработка задач на текущее время
  useEffect(() => {
    const isMoreTasks = activeTasks.length > TASKS_SHOW_LIMIT;

    activeTasks.forEach((task) => {
      const {
        taskType: type,
        taskDescription: description,
        taskEndDate: dateTime,
        clientId,
      } = task;

      const id = uuidv4();
      const icon = TASKS_TYPES_ICONS_MAP[type];
      const title = (
        <Title
          id={id}
          clientId={clientId}
          onClickLink={onClickLink}
          history={history}
        />
      );

      addNotification({
        id,
        icon,
        title,
        content: <Content description={description} date={dateTime} />,
        dateTime: task.taskEndDate,
        clientId: task.clientId,
      });

      if (!isMoreTasks) {
        showNotification({
          id,
          icon,
          title,
          content: (
            <Content description={description} date={dateTime} ellipsis />
          ),
        });
      }
    });

    if (isMoreTasks) {
      const props = getMoreActiveTasksProps(activeTasks.length, t);
      showNotification(props);
    }

    if (activeTasks.length) {
      playSound();
    }
  }, [addNotification, activeTasks, history, t, onClickLink]);

  return { notifications, setNotifications };
};
