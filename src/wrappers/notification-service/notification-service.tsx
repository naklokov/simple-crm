import React, { ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { getOverdueTasks } from "../../utils";
import { notification } from "antd";
import { getCurrentTasks } from "./utils";
import { CurrentDescription, OverdueDescription } from "./components";
import { useHistory } from "react-router";
import { TaskEntityProps, TASK_TYPES_MAP, State } from "../../constants";

const MINUTE = 60000;

interface NotificationServiceProps {
  children: ReactNode;
}

export const NotificationService = ({ children }: NotificationServiceProps) => {
  const [t] = useTranslation("notification");
  const history = useHistory();
  const [seconds, setSeconds] = useState(0);
  const [overdueShowed, setOverdueShowed] = useState(false);
  const [currentShow, setCurrentShow] = useState(false);

  const tasks = [] as TaskEntityProps[];

  const renderCurrentTask = (task: TaskEntityProps) => {
    const message = <strong>{TASK_TYPES_MAP[task.taskType]}</strong>;
    const key = uuidv4();
    notification.info({
      key,
      message,
      description: (
        <CurrentDescription
          notificationKey={key}
          task={task}
          history={history}
        />
      ),
      duration: null,
    });
  };

  const renderOverdueNotification = () => {
    const overdueTasks = getOverdueTasks(tasks);

    if (!isEmpty(overdueTasks)) {
      const message = <strong>{t("overdue.message.title")}</strong>;
      notification.warning({
        key: "overdue",
        message,
        description: (
          <OverdueDescription tasks={overdueTasks} history={history} />
        ),
        duration: null,
      });
    }
  };

  // эффект отрисовки текущих задач ежеминутно
  useEffect(() => {
    if (currentShow) {
      const currentTasks = getCurrentTasks(tasks);
      if (currentTasks.length) {
        currentTasks.forEach(renderCurrentTask);
      }
      setCurrentShow(false);
    }
  }, [currentShow, tasks, renderCurrentTask]);

  // эффект для отрисовки просроченных задач при инициализации приложения
  useEffect(() => {
    if (tasks.length && !overdueShowed) {
      renderOverdueNotification();
      setOverdueShowed(true);
    }
  }, [tasks, overdueShowed, renderOverdueNotification]);

  // эффект таймер для запуска отрисовки задач ежеминутно
  useEffect(() => {
    if (seconds < 60) {
      const seconds = moment().seconds();
      setTimeout(() => setSeconds(seconds + 1), 1000);
    } else {
      setCurrentShow(true);
      setTimeout(() => {
        setCurrentShow(true);
      }, MINUTE);
    }
  }, [seconds]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default NotificationService;
