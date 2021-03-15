import { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  showNotification,
  useOverdueTasksTotal,
  useActiveTasks,
  getMoreActiveTasksProps,
  getActiveTasksProps,
  getOverdueTasksProps,
} from "./utils";
import { NotificationProps, TASKS_SHOW_LIMIT } from "../../constants";
import { play as playSound } from "../sounds";

export const useNotificationService = (onClickLink: (id: string) => void) => {
  const [t] = useTranslation("notifications");
  const history = useHistory();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const activeTasks = useActiveTasks();
  const overdueTasksTotal = useOverdueTasksTotal();

  const addNotification = useCallback(
    (notification: NotificationProps) => {
      setNotifications((prevNotifications) => [
        { ...notification, status: "unread" },
        ...prevNotifications,
      ]);
    },
    [notifications]
  );

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
  }, [overdueTasksTotal]);

  // обработка задач на текущее время
  useEffect(() => {
    const isMoreTasks = activeTasks.length > TASKS_SHOW_LIMIT;

    activeTasks.map((task) => {
      const props = getActiveTasksProps(task, onClickLink, history);

      addNotification({
        ...props,
        dateTime: task.taskEndDate,
        clientId: task.clientId,
      });

      if (!isMoreTasks) {
        showNotification(props);
      }
    });

    if (isMoreTasks) {
      const props = getMoreActiveTasksProps(activeTasks.length, t);
      showNotification(props);
    }

    if (activeTasks.length) {
      playSound();
    }
  }, [activeTasks, onClickLink]);

  return { notifications, setNotifications };
};
